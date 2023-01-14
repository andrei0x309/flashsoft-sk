
<script lang="ts">
  import CertImg from './CertImg.svelte';
  import CertPagination from './CertPagination.svelte';
  export let currentPage: number;
  export let maxPage: number;
  export let rest: string;

  interface Cert {
    id: number;
    cert_name: string;
    cert_feature_image: string;
    cert_file_name: string;
    cat: {
      cat_name: string;
      cat_icon_name: string;
    }
    tags: {
      id: number;
      name: string;
    }[]
  }
  export let data = [] as Cert[];

</script>


<div class="card-deck certbottommagin grid-cols-1 grid md:grid-cols-2 lg:grid-cols-3  gap-2 md:gap-4">
  {#each data as cert}
    <div class="card">
         <CertImg propData={{imageSource:`/res/cert_pic/${cert['cert_feature_image']}`, 
         certName: cert['cert_name'] }} />
       
    <div class="card-body">
 
        <h3 class="card-title cert-card-title">{ cert['cert_name'] }</h3>
     
      
      {#if cert['tags']?.length}
      <p style="margin-bottom: 0.5em;">Tags:</p>
      <ul class="tags">
        {#each cert['tags'] as tag}
        <li><a href={`/show-cert/filter/tags/${tag['id']}/tags`}>{tag['name']}</a></li>
        {/each}
	</ul>
      {/if}
      <p class="card-text">
      </p>
      
        {#if cert['cat']?.cat_name}
        <p class="text-right" style="margin-top: auto;">
          <small class="text-muted text-right">
            Issued by: { cert['cat']?.cat_name }
          </small>&nbsp;<svg class="cat-icon"><use href="/res/cat-icons.svg#cat-icon-{ cert['cat']?.cat_icon_name }" xlink:href="/res/cat-icons.svg#cat-icon-{ cert['cat']?.cat_icon_name }}"/></svg></p>
        {/if}
    </div>
    <!-- <div class="card-footer">
      <small class="text-muted"> 
       
           <router-link :to="{ name: 'ZoomModal', params: { id:'{{ $cert->id }}', certName:'{{ str_replace(" ", "-", $cert->cert_name) }}'   } }"><button type="button" class="btn-11 raise"><span class="icon-expand" style="color:#f11154;"></span>&nbsp;&nbsp;&nbsp;Zoom</button></router-link>
          <a href="{{ secure_asset('/res/cert_pdf/'.$cert->cert_file_name)  }}" >
            <button type="button" class="btn-11 raise">
              <span class="icon-file-pdf-o" style="color:#f11154;"></span>&nbsp;&nbsp;&nbsp;View PDF</button>
           </a> 
           </small>
    </div> -->
    </div>
  {/each}
</div>

<CertPagination maxPage={maxPage} currentPage={currentPage} rest={rest} />

