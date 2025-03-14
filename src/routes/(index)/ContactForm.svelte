<script lang="ts">
import AlertEmail from './AlertEmail.svelte';
import { onMount } from 'svelte';
import Lazy from '@/components/Lazy.svelte';
import { browser } from '$app/environment';

let email: string = $state('');
let name: string = $state('');
let message: string = $state('');
let mailForm: HTMLElement | undefined = $state();
let spinner: HTMLElement | undefined = $state();
let hcaptchaElement: HTMLElement | undefined = $state();

let showAlert: boolean = $state(false);
let alertMsg: string = $state('');
let alertType: string = $state('error');

let HCScriptEl: HTMLScriptElement;

const showAlertElement = (msg: string, type: string) => {
  showAlert = true;
  alertMsg = msg;
  alertType = type;
};

const setLoadEmail = (isSending = true) => {
  if (isSending) {
    if (mailForm) {
      mailForm.style.display = 'none';
    }
    if (spinner) {
      spinner.style.display = 'inline-block';
    }
  } else {
    if (mailForm) {
      mailForm.style.display = 'block';
    }
    if (spinner) {
      spinner.style.display = 'none';
    }
  }
};

const submitEmail = async (event: Event) => {
  event.preventDefault();
  const hCaptcha = (document?.querySelector('form div iframe') as HTMLElement)?.dataset?.hcaptchaResponse;

  setLoadEmail(true);
  const data = {
    email,
    name,
    message,
    hCaptcha
  };

  const recentEmail = localStorage.getItem('recent-email');
  if (recentEmail) {
    const num = isNaN(parseInt(recentEmail)) ? 0 : parseInt(recentEmail);
    const date = new Date(num);
    const now = new Date();
    if (date.getTime() + 6e5 > now.getTime()) {
      showAlertElement('You sent an email recently', 'error');
      setLoadEmail(false);
      return;
    }
  }
  try {
    const response = await fetch('/api/index/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    setLoadEmail(false);
    if (response.ok) {
      showAlertElement('Email sent!', 'success');
      localStorage.setItem('recent-email', new Date().getTime().toString());
    } else {
      if (response.status === 400) {
        await response.json().then((data: any) => {
          showAlertElement(`Error: ${data?.error}`, 'error');
        });
        return;
      }
      if (response.status === 404) {
        showAlertElement('Error: api not found', 'error');
        return;
      }
      showAlertElement('Error: Something went wrong', 'error');
    }
  } catch (error) {
    showAlertElement(`Error: ${error}`, 'error');
  }
};

const renderCaptcha = () => {
  if (hcaptchaElement && (window as unknown as { hcaptcha: unknown })?.hcaptcha) {
    (
      window as unknown as {
        hcaptcha: {
          render: (
            el: HTMLElement,
            op: {
              sitekey: string;
              theme: string;
            }
          ) => void;
        };
      }
    ).hcaptcha.render(hcaptchaElement, {
      sitekey: 'c529949f-b6e7-4e97-af3a-0ddb0f7c1c5a',
      theme: 'dark'
    });
  }
};

// 	const config = { attributes: true, childList: true, subtree: true };

// 	const mutationCallback = (mutationList: {type: string}[], observer: unknown) => {
//   for (const mutation of mutationList) {
// 	if (mutation.type === "attributes") {
//       renderCaptcha();
// 	  (observer as {disconnect: () => void}).disconnect();
//     }
//   }
// };

// const checkForCaptcha = () => {
// 	const observer = new MutationObserver(mutationCallback);
// 		observer.observe(HCScriptEl, config);
// }

onMount(() => {});
</script>

<section id="section-contact">
	<div class="ls-h mb-0">
		<h2 class="my-3">Contact form</h2>
	</div>
	<div id="ls-ct-fr" class="ls-ct-fr">
		<div bind:this={spinner} id="spinner" class="spinner spinner__1"></div>
		<AlertEmail bind:showAlert bind:msg={alertMsg} bind:type={alertType} />
		{#if browser}
			<Lazy>
				<form bind:this={mailForm} id="mail-form">
					<input bind:value={name} id="form-name" name="name" type="text" placeholder="Name" />
					<input bind:value={email} id="form-email" name="email" type="email" placeholder="Email" />
					<textarea
						bind:value={message}
						id="form-message"
						name="message"
						cols="30"
						rows="5"
						placeholder="Message"
					></textarea>

					<div bind:this={hcaptchaElement} class="flex justify-center"></div>
					<script
						src="https://js.hcaptcha.com/1/api.js?render=explicit"
						async
						defer
						onload={renderCaptcha}
					></script>
					<button
						onclick={submitEmail}
						id="form-submit"
						type="submit"
						value="Send"
						class="btn-submit"><i class="icon-paper-plane-o"></i>&nbsp;Send&nbsp;</button
					>
				</form>
			</Lazy>
		{:else}
			<form bind:this={mailForm} id="mail-form">
				<input bind:value={name} id="form-name" name="name" type="text" placeholder="Name" />
				<input bind:value={email} id="form-email" name="email" type="email" placeholder="Email" />
				<textarea
					bind:value={message}
					id="form-message"
					name="message"
					cols="30"
					rows="5"
					placeholder="Message"
				></textarea>

				<button
					onclick={submitEmail}
					id="form-submit"
					type="submit"
					value="Send"
					class="btn-submit"><i class="icon-paper-plane-o"></i>&nbsp;Send&nbsp;</button
				>
			</form>
		{/if}
	</div>
</section>
