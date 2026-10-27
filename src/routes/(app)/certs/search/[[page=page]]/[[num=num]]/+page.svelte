<script lang="ts">
import '#/routes/(app)/cert.scss';
import CertListPage from '#/routes/(app)/certs/components/CertListPage.svelte';
import type { CertData } from '#/routes/(app)/certs/types/cert.ts';

interface Props {
  data: CertData;
}

const { data }: Props = $props();
</script>
    
    <main id="app">
    <CertListPage data={data} />
</main>
    