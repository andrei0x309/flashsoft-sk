<script lang="ts">
    import Header from "../../Header.svelte"
    import type { PageServerLoad } from './$types';

    export let data: PageServerLoad;
    console.log(data)

    </script>
    
<Header segment="projects" />