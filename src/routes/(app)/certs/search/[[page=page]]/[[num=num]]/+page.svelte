<script lang="ts">
    import '@/routes/(app)/cert.scss';
    import type { CertData } from '@/routes/(app)/certs/types/cert'
    import  CertListPage from '@/routes/(app)/certs/components/CertListPage.svelte';
    
    interface Props {
      data: CertData;
    }
    
    let { data }: Props = $props();
    
    </script>
    
    <main id="app">
    <CertListPage data={data} />
</main>
    