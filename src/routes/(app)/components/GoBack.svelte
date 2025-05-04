<script lang="ts">
   
    interface Props {
        backRoute: string;
        rel?: string;
        text?: string;
        class?: string;
    }

     let {  backRoute, rel, text, class: className = '' }: Props = $props();

     if (rel === undefined) {
        rel = '';
     }
     if (text === undefined) {
        text = 'Go back';
     }
     if (backRoute === undefined) {
        backRoute = '/';
     }

</script>
  
  <a class={`inline hover:font-bold group ${className}`} href={backRoute} rel={rel}>
    <img class="-rotate-90 inline group-hover:skew-[6.142rad]" src="/images/cd-top-arrow.svg" alt={text} /> {text}
  </a>

<style scoped>

    
</style>
