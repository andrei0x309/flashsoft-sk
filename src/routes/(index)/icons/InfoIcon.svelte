<script lang="ts">
	const { class: className } = $props<{ class?: string | undefined }>();
</script>

<svg
	enable-background="new 0 0 100 100"
    class={className || 'h-10 w-10 inline-block mr-[1.6rem]'}
	version="1.1"
	viewBox="0 0 100 100"
	><g
		><polygon
			fill="#010101"
			points="78.1,51.4 78.1,79.2 22,79.2 22,26.5 50.4,26.5 50.4,24.5 20,24.5 20,81.2 80,81.2 80,51.4    78.1,51.4  "
		/><path
			d="M47.9,39.8c-0.6,0.6-0.9,1.2-0.9,2.1c0,0.8,0.3,1.5,0.9,2.1c0.6,0.6,1.2,0.9,2.1,0.9c0.8,0,1.5-0.3,2.1-0.9   c0.6-0.6,0.9-1.3,0.9-2.1c0-0.9-0.3-1.6-0.9-2.1c-0.6-0.6-1.3-0.8-2.1-0.8C49.2,38.9,48.6,39.2,47.9,39.8z"
		/><rect height="15.8" width="3" x="49.2" y="50.6" /></g
	></svg
>
