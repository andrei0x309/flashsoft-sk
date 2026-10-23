<script lang="ts">
import '@/routes/(app)/cert.scss';
import CertListPage from '@/routes/(app)/certs/components/CertListPage.svelte';
import type { CertData } from '@/routes/(app)/certs/types/cert';

interface Props {
  data: CertData;
}

let { data }: Props = $props();
</script>

<main id="app">
<CertListPage data={data} />
</main>
