<script lang="ts">
interface Props {
  page: number;
  totalPages: number;
}

let { page, totalPages }: Props = $props();

</script>

<div class="flex justify-center">
	{#if page > 1}
		<a href={`/projects/page/${page - 1}`} class="btn-projects p-2 mx-2 my-1">&#8249; Previous </a>
	{/if}
	{#if page < totalPages}
		<a href={`/projects/page/${page + 1}`} class=" btn-projects p-2 mx-2 my-1">Next &#8250;</a>
	{/if}
</div>
