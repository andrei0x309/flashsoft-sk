let workerScript;

  // MARK: Widget
  class CapWidget extends HTMLElement {
    #workerUrl = '';
    #resetTimer = null;
    #workersCount = navigator.hardwareConcurrency || 8;
    tokenData = null;
    #shadow;
    #div;
    #host;
    #solving = false;
    #eventHandlers;
    boundHandleProgress;
    boundHandleSolve;
    boundHandleError;
    boundHandleReset;

    static get observedAttributes() {
      return ['onsolve', 'onprogress', 'onreset', 'onerror', 'workers', '[cap]'];
    }

    constructor() {
      super();
      if (this.#eventHandlers) {
        this.#eventHandlers.forEach((handler, eventName) => {
          this.removeEventListener(eventName.slice(2), handler);
        });
      }

      this.#eventHandlers = new Map();
      this.boundHandleProgress = this.handleProgress.bind(this);
      this.boundHandleSolve = this.handleSolve.bind(this);
      this.boundHandleError = this.handleError.bind(this);
      this.boundHandleReset = this.handleReset.bind(this);
    }

    initialize() {
      this.#workerUrl = URL.createObjectURL(
        new Blob([workerScript], {
          type: 'application/javascript'
        })
      );
    }

    attributeChangedCallback(name, _, value) {
      if (name.startsWith('on')) {
        const eventName = name.slice(2);
        const oldHandler = this.#eventHandlers.get(name);
        if (oldHandler) {
          this.removeEventListener(eventName, oldHandler);
        }

        if (value) {
          const handler = (event) => {
            const callback = this.getAttribute(name);
            if (typeof window[callback] === 'function') {
              window[callback].call(this, event);
            }
          };
          this.#eventHandlers.set(name, handler);
          this.addEventListener(eventName, handler);
        }
      }
    }

    async connectedCallback() {
      this.#host = this;
      this.#shadow = this.attachShadow({ mode: 'open' });
      this.#div = document.createElement('div');
      this.createUI();
      this.addEventListeners();
      await this.initialize();
      this.#div.removeAttribute('disabled');

      const workers = this.getAttribute('data-cap-worker-count');
      this.setWorkersCount(parseInt(workers) ? parseInt(workers, 10) : navigator.hardwareConcurrency || 8);
      const fieldName = this.getAttribute('data-cap-hidden-field-name') || 'cap-token';
      this.#host.innerHTML = `<input type="hidden" name="${fieldName}">`;
    }

    async solve() {
      if (this.#solving) {
        return;
      }

      try {
        this.#solving = true;
        this.updateUI('verifying', 'Verifying...', true);

        this.dispatchEvent('progress', { progress: 0 });

        try {
          const apiEndpoint = this.getAttribute('data-cap-api-endpoint');
          if (!apiEndpoint) throw new Error('Missing API endpoint');

          const { challenge, token } = await (
            await fetch(`${apiEndpoint}challenge`, {
              method: 'POST'
            })
          ).json();
          const solutions = await this.solveChallenges(challenge);

          const resp = await (
            await fetch(`${apiEndpoint}redeem`, {
              method: 'POST',
              body: JSON.stringify({ token, solutions }),
              headers: { 'Content-Type': 'application/json' }
            })
          ).json();

          this.dispatchEvent('progress', { progress: 100 });

          if (!resp.success) throw new Error('Invalid solution');
          const fieldName = this.getAttribute('data-cap-hidden-field-name') || 'cap-token';
          if (this.querySelector(`input[name='${fieldName}']`)) {
            this.querySelector(`input[name='${fieldName}']`).value = resp.token;
          }

          this.dispatchEvent('solve', { token: resp.token });
          this.tokenData = resp.token;

          if (this.#resetTimer) clearTimeout(this.#resetTimer);
          const expiresIn = new Date(resp.expires).getTime() - Date.now();
          if (expiresIn > 0 && expiresIn < 24 * 60 * 60 * 1000) {
            this.#resetTimer = setTimeout(() => this.reset(), expiresIn);
          } else {
            this.error('Invalid expiration time');
          }

          return { success: true, token: this.tokenData };
        } catch (err) {
          this.error(err.message);
          throw err;
        }
      } finally {
        this.#solving = false;
      }
    }

    async solveChallenges(challenge) {
      const total = challenge.length;
      let completed = 0;

      const workers = Array(this.#workersCount)
        .fill(null)
        .map(() => new Worker(this.#workerUrl));

      const solveSingleChallenge = ([salt, target], workerId) =>
        new Promise((resolve, reject) => {
          const worker = workers[workerId];
          const timeout = setTimeout(() => {
            worker.terminate();
            workers[workerId] = new Worker(this.#workerUrl);
            reject(new Error('Worker timeout'));
          }, 30000);

          worker.onmessage = ({ data }) => {
            if (!data.found) return;
            clearTimeout(timeout);
            completed++;
            this.dispatchEvent('progress', {
              progress: Math.round((completed / total) * 100)
            });
            resolve([salt, target, data.nonce]);
          };

          worker.onerror = (err) => {
            clearTimeout(timeout);
            console.error(err);
            this.error(`Error in worker: ${err}`);
            reject(err);
          };

          worker.postMessage({ salt, target });
        });

      const results = [];
      try {
        for (let i = 0; i < challenge.length; i += this.#workersCount) {
          const chunk = challenge.slice(i, Math.min(i + this.#workersCount, challenge.length));
          const chunkResults = await Promise.all(chunk.map((c, idx) => solveSingleChallenge(c, idx)));
          results.push(...chunkResults);
        }
      } finally {
        workers.forEach((w) => w.terminate());
      }

      return results;
    }

    setWorkersCount(workers) {
      const parsedWorkers = parseInt(workers, 10);
      const maxWorkers = Math.min(navigator.hardwareConcurrency || 8, 16);
      this.#workersCount =
        !isNaN(parsedWorkers) && parsedWorkers > 0 && parsedWorkers <= maxWorkers ? parsedWorkers : navigator.hardwareConcurrency || 8;
    }

    createUI() {
      this.#div.classList.add('captcha');
      this.#div.setAttribute('role', 'button');
      this.#div.setAttribute('tabindex', '0');
      this.#div.setAttribute('disabled', 'true');
      this.#div.innerHTML = `<div class="checkbox"></div><p>I'm a human</p>`;
      this.#shadow.innerHTML = `<style>.captcha{margin: auto;background-color:var(--cap-background);border:1px solid var(--cap-border-color);border-radius:var(--cap-border-radius);width:var(--cap-widget-width);display:flex;align-items:center;padding:var(--cap-widget-padding);gap:var(--cap-gap);cursor:pointer;transition:filter var(--cap-transition-duration),transform var(--cap-transition-duration);position:relative;-webkit-tap-highlight-color:rgba(255,255,255,0);overflow:hidden;color:var(--cap-color)}.captcha:hover{filter:var(--cap-hover-filter)}.captcha:not([disabled]):active{transform:scale(var(--cap-active-scale))}.checkbox{width:var(--cap-checkbox-size);height:var(--cap-checkbox-size);border:var(--cap-checkbox-border);border-radius:var(--cap-checkbox-border-radius);background-color:var(--cap-checkbox-background);transition:opacity var(--cap-transition-duration);margin-top:var(--cap-checkbox-margin);margin-bottom:var(--cap-checkbox-margin)}.captcha *{font-family:var(--cap-font)}.captcha p{margin:0;font-weight:500;font-size:15px;user-select:none;transition:opacity var(--cap-transition-duration)}.captcha[data-state=verifying] .checkbox{background: none;display:flex;align-items:center;justify-content:center;transform: scale(1.1);border: none;border-radius: 50%;background: conic-gradient(var(--cap-spinner-color) 0%, var(--cap-spinner-color) var(--progress, 0%), var(--cap-spinner-background-color) var(--progress, 0%), var(--cap-spinner-background-color) 100%);position: relative;}.captcha[data-state=verifying] .checkbox::after {content: "";background-color: var(--cap-background);width: calc(100% - var(--cap-spinner-thickness));height: calc(100% - var(--cap-spinner-thickness));border-radius: 50%;margin:calc(var(--cap-spinner-thickness) / 2)}.captcha[data-state=done] .checkbox{border:1px solid transparent;background-image:var(--cap-checkmark);background-size:cover}.captcha[data-state=error] .checkbox{border:1px solid transparent;background-image:var(--cap-error-cross);background-size:cover}.captcha[disabled]{
        cursor:not-allowed}.captcha[disabled][data-state=verifying]{cursor:progress}.captcha[disabled][data-state=done]{cursor:default}.captcha .credits{position:absolute;bottom:10px;right:10px;font-size:var(--cap-credits-font-size);color:var(--cap-color);opacity:var(--cap-opacity-hover)}.captcha .credits span{display:none;text-decoration:underline}.captcha .credits:hover span{display:inline-block}</style>`;

      this.#shadow.appendChild(this.#div);
    }

    addEventListeners() {
      this.#div.addEventListener('click', () => {
        if (!this.#div.hasAttribute('disabled')) this.solve();
      });

      this.#div.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !this.#div.hasAttribute('disabled')) {
          e.preventDefault();
          this.solve();
        }
      });

      this.addEventListener('progress', this.boundHandleProgress);
      this.addEventListener('solve', this.boundHandleSolve);
      this.addEventListener('error', this.boundHandleError);
      this.addEventListener('reset', this.boundHandleReset);
    }

    updateUI(state, text, disabled = false) {
      this.#div.setAttribute('data-state', state);
      this.#div.querySelector('p').innerText = text;
      if (disabled) {
        this.#div.setAttribute('disabled', 'true');
      } else {
        this.#div.removeAttribute('disabled');
      }
    }

    handleProgress(event) {
      const progressElement = this.#div.querySelector('p');
      if (progressElement) {
        this.#div.querySelector('.checkbox').style.setProperty('--progress', `${event.detail.progress}%`);
        progressElement.innerText = `Verifying... ${event.detail.progress}%`;
      }
      this.executeAttributeCode('onprogress', event);
    }

    handleSolve(event) {
      this.updateUI('done', "You're a human", true);
      this.executeAttributeCode('onsolve', event);
    }

    handleError(event) {
      this.updateUI('error', 'Error. Try again.');
      this.executeAttributeCode('onerror', event);
    }

    handleReset(event) {
      this.updateUI('', "I'm a human");
      this.executeAttributeCode('onreset', event);
    }

    executeAttributeCode(attributeName, event) {
      const code = this.getAttribute(attributeName);
      if (!code) {
        return;
      }
      const func = new Function('event', code);
      func.call(this, event);
    }

    error(message = 'Unknown error') {
      console.error('[cap] Error:', message);
      this.dispatchEvent('error', { isCap: true, message });
    }

    dispatchEvent(eventName, detail = {}) {
      const event = new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail
      });
      super.dispatchEvent(event);
    }

    reset() {
      if (this.#resetTimer) {
        clearTimeout(this.#resetTimer);
        this.#resetTimer = null;
      }
      this.dispatchEvent('reset');
      this.tokenData = null;
      const fieldName = this.getAttribute('data-cap-hidden-field-name') || 'cap-token';
      if (this.querySelector(`input[name='${fieldName}']`)) {
        this.querySelector(`input[name='${fieldName}']`).value = '';
      }
    }

    get token() {
      return this.tokenData;
    }

    disconnectedCallback() {
      this.removeEventListener('progress', this.boundHandleProgress);
      this.removeEventListener('solve', this.boundHandleSolve);
      this.removeEventListener('error', this.boundHandleError);
      this.removeEventListener('reset', this.boundHandleReset);

      this.#eventHandlers.forEach((handler, eventName) => {
        this.removeEventListener(eventName.slice(2), handler);
      });
      this.#eventHandlers.clear();

      if (this.#shadow) {
        this.#shadow.innerHTML = '';
      }

      this.reset();
      this.cleanup();
    }

    cleanup() {
      if (this.#resetTimer) {
        clearTimeout(this.#resetTimer);
        this.#resetTimer = null;
      }

      if (this.#workerUrl) {
        URL.revokeObjectURL(this.#workerUrl);
        this.#workerUrl = '';
      }
    }
  }

function capMount() {

  const sheet = new CSSStyleSheet();
  sheet.replaceSync(
    `html{
        --cap-font:system,-apple-system,"BlinkMacSystemFont",".SFNSText-Regular","San Francisco","Roboto","Segoe UI","Helvetica Neue","Lucida Grande","Ubuntu","arial",sans-serif;
        --cap-checkbox-border:1px solid #aaaaaad1;
        --cap-widget-width:240px;
        --cap-widget-padding:14px;
        --cap-checkbox-size:24px;
        --cap-checkbox-margin:2px;
        --cap-transition-duration:0.2s;
        --cap-gap:15px;
        --cap-opacity-hover:0.8;
        --cap-hover-filter:brightness(97%);
        --cap-active-scale:0.98;
        --cap-credits-font-size:12px;
        --cap-error-cross:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24'%3E%3Cpath fill='%23f55b50' d='M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8'/%3E%3C/svg%3E");
        --cap-spinner-thickness:5px;

        --cap-background: #161618;
        --cap-color: #f3f3f3;
        --cap-border-color: rgba(255, 255, 255, .05);
        --cap-checkbox-border-radius: 6px;
        --cap-border-radius: 4px;
        --cap-checkbox-background: transparent;
        --cap-checkmark: url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cstyle%3E%40keyframes%20anim%7B0%25%7Bstroke-dashoffset%3A23.21320343017578px%7Dto%7Bstroke-dashoffset%3A0%7D%7D%3C%2Fstyle%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22m5%2012%205%205L20%207%22%20style%3D%22stroke-dashoffset%3A0%3Bstroke-dasharray%3A23.21320343017578px%3Banimation%3Aanim%20.5s%20ease%22%2F%3E%3C%2Fsvg%3E);
        --cap-spinner-color: white;
        --cap-spinner-background-color: rgba(255, 255, 255, .1);
      }`
  );
  document.adoptedStyleSheets.push(sheet);

  const workerFunct = function () {
    if (typeof WebAssembly !== 'object' || typeof WebAssembly?.instantiate !== 'function') {
      self.onmessage = async ({ data: { salt, target } }) => {
        // Fallback solver in case WASM is not available

        let nonce = 0;
        const batchSize = 50000;
        let processed = 0;
        const encoder = new TextEncoder();

        const targetBytes = new Uint8Array(target.length / 2);
        for (let k = 0; k < targetBytes.length; k++) {
          targetBytes[k] = parseInt(target.substring(k * 2, k * 2 + 2), 16);
        }
        const targetBytesLength = targetBytes.length;

        while (true) {
          try {
            for (let i = 0; i < batchSize; i++) {
              const inputString = salt + nonce;
              const inputBytes = encoder.encode(inputString);

              const hashBuffer = await crypto.subtle.digest('SHA-256', inputBytes);

              const hashBytes = new Uint8Array(hashBuffer, 0, targetBytesLength);

              let matches = true;
              for (let k = 0; k < targetBytesLength; k++) {
                if (hashBytes[k] !== targetBytes[k]) {
                  matches = false;
                  break;
                }
              }

              if (matches) {
                self.postMessage({ nonce, found: true });
                return;
              }

              nonce++;
            }

            processed += batchSize;
          } catch (error) {
            console.error('[cap] fallback worker error', error);
            self.postMessage({
              found: false,
              error: error.message
            });
            return;
          }
        }
      };

      return console.warn('[cap] WebAssembly is not supported, falling back to alternative solver.');
    }

 
    let initPromise, solve_pow_function

    initPromise = import("https://cdn.jsdelivr.net/npm/@cap.js/wasm@0.0.3/browser/cap_wasm.min.js").then((wasmModule) => {
        return wasmModule.default().then((instance) => {
          solve_pow_function = (instance && instance.exports ? instance.exports : wasmModule).solve_pow;
        });
      })
      .catch((e) => {
        useFallback = true;
        console.error('[cap] using fallback solver due to error:', e);
      });

    self.onmessage = async ({ data: { salt, target } }) => {
      const until = (predFn) => {
        const poll = (done) => (predFn() ? done() : setTimeout(() => poll(done), 500));
        return new Promise(poll);
      };

      try {
        await initPromise;
        await until(() => !!solve_pow_function);

        const startTime = performance.now();
        const nonce = solve_pow_function(salt, target);
        const endTime = performance.now();

        self.postMessage({
          nonce: Number(nonce),
          found: true,
          durationMs: (endTime - startTime).toFixed(2)
        });
      } catch (error) {
        console.error('[cap] solver error', error);
        self.postMessage({
          found: false,
          error: error.message || String(error)
        });
      }
    };

    self.onerror = (error) => {
      self.postMessage({
        found: false,
        error: `Worker error: ${error.message || error}`
      });
    };
  };

  workerScript = `(() => {${workerFunct
    .toString()
    .replace(/^function\s*\([^\)]*\)\s*{|\}$/g, '')
    .trim()}})()`;

  if (!customElements.get('cap-widget')) {
    customElements.define('cap-widget', CapWidget);
  } else {
    console.warn('The cap-widget element has already been defined. Skipping re-defining it.');
  }

  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = Cap;
  } else if (typeof define === 'function' && define.amd) {
    define([], function () {
      return Cap;
    });
  }

  if (typeof exports !== 'undefined') {
    exports.default = Cap;
  }
}

window.capMount = capMount