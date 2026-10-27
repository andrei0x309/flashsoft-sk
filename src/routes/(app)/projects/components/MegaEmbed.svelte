<script lang="ts">
interface Props {
  source: string;
}
const { source }: Props = $props();
</script>


<iframe class="mx-auto my-2" title="Demo videoclip" frameborder="0" src={source} allowfullscreen >
</iframe>