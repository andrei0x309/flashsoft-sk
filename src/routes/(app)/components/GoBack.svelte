<script lang="ts">
interface Props {
  backRoute: string;
  rel?: string;
  text?: string;
  class?: string;
}

let {
  backRoute = '/',
  rel = '',
  text = 'Go back',
  class: className = ''
}: Props = $props();

</script>
  
  <a class={`inline hover:font-bold group ${className}`} href={backRoute} rel={rel}>
    <img class="-rotate-90 inline group-hover:skew-[6.142rad] w-5 h-5" src="/images/cd-top-arrow.svg" alt={text} /> {text}
  </a>

<style scoped>

    
</style>
