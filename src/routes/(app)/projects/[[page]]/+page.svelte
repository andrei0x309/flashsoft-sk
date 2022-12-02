<script lang="ts">
    import Header from "../../Header.svelte"
    import type { PageData } from './$types';

    export let data: PageData;
    console.log(data)

    </script>
    
<Header segment="projects" />