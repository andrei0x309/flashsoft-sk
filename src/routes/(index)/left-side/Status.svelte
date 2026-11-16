<script lang="ts">
interface Props {
  class?: string;
}

const { class: className = '' }: Props = $props();
</script>
<a rel="nofollow external" href="https://status.flashsoft.eu">
    <img class={`mx-auto mt-4 w-24 h-[1.4rem] ${className}`} src="/images/betterstack-uptime.svg" alt="flashsoft.eu Status" />
</a>