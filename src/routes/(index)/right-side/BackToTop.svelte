<script lang="ts">
    export let showOnPx = 250;
    let hidden = true;
  
    function goTop() {
      document.body.scrollIntoView();
    }
  
    function scrollContainer() {
      return document.documentElement || document.body;
    }
  
    function handleOnScroll() {
      if (!scrollContainer()) {
        return;
      }
  
      if (scrollContainer().scrollTop > showOnPx) {
        hidden = false;
      } else {
        hidden = true;
      }
    }
  </script>
  
  <style scoped>
    .back-to-top {
      opacity: 1;
      transition: opacity 0.5s, visibility 0.5s;
      position: fixed;
      z-index: 99;
      right: 2rem;
      user-select: none;
      bottom: 2rem;
      color: white;
      background-color: var(--color-zinc-950);
      padding: 0.5rem;
      border-radius: 50%;
    }

    .back-to-top:hover {
      background-color: rgb(182, 116, 62);
      opacity: 0.8;
    }
  
    .back-to-top-hidden {
      opacity: 0;
      visibility: hidden;
    }
  </style>
  
  <svelte:window onscroll={handleOnScroll} />
  
  <button class={`back-to-top cursor-pointer ${hidden ? 'back-to-top-hidden': ''}`} onclick={goTop} aria-label="Back to top">
    <img src="/images/cd-top-arrow.svg" class="w-5 h-5" alt="Back to top" />
  </button>