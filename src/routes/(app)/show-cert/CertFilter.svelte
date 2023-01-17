<script lang="ts">

import { goto } from '$app/navigation';
import { slide } from 'svelte/transition';

import { PUBLIC_HTTP_ROOT, PUBLIC_RUN_ENV } from '$env/static/public'


export let expanded: boolean = false;
let tags: any[] = [];
export let selectedTags: number[] = [];
let allTags = false;

let loadingTags = false;

const fetchTags = async (all = false) => {
  const response = await fetch(`${PUBLIC_HTTP_ROOT}/${PUBLIC_RUN_ENV === 'deno'? 'edge-api': 'api' }/cert/get/tags${all ? '?all=true' : ''}`);
  const json = await response.json();
  return json;
}

const setTags = (all = false) => {
  loadingTags = true;
  allTags = all;
  fetchTags(all).then((data) => {
    tags = data?.data ?? [];
    loadingTags = false;
  });
}

const submitForm = () => {
   if(selectedTags.length > 0){
      goto(`/show-cert/filter/tags/${selectedTags.join('/')}/tags`);
   } else {
      goto(`/show-cert`);
   }
}

$: if (expanded) {
  if (tags.length < 1) {
    if(selectedTags.length > 0){
      loadingTags = true;
      fetchTags().then((data) => {
        const alltags = data.data.some((tag: any) => {
          return !selectedTags.includes(tag.tag_id);
        });
        if (alltags) {
          tags = data?.data ?? []
          loadingTags = false;
        } else {
          setTags(true);
        }
      });
    } else {
      setTags(allTags);
    }
  }
}

// export default {   
//   data () {
//     return {
//       showCollapse: false,
//       showTagLoading: true,
//       showError: false,
//       stopCollapse: false,
//       gotAllTags:false,
//       errorMsg:'',
//       checkboxes:{},
//       tags: []
      
//     }
//   },props: ['tagsRoute'],
//   created() {
//       let url;
//       let isNode=new Function("try {return this===global;}catch(e){return false;}")();
//       if( isNode ){
//          url = this.tagsRoute.indexUrl;
//       }else{
//          url = window.location.href;
//       }
 
//       if(url.indexOf(this.tagsRoute.filterUrl) === 0){
//       let queryStr = url.substring(this.tagsRoute.filterUrl.length,url.length);
//       let myRegexp = /.*?tags\/(.*?)\/tags/g;
//       let match = myRegexp.exec(queryStr);
//       let filterIds = match[1].split("/");
//       let vci = this;
//       //      this.toggleCollapse()
//       this.toggleCollapse(false, true).then( function(){
//       let hasAllKeys = filterIds.every(function(fitem){
//         return vci.tags.some( function(oitem){
//         // for not converting str to int
//         return oitem.tag_id == fitem ;
              
//           }   );

//       });
      
//       if(hasAllKeys){
//          filterIds.forEach( function(item){
//                vci.$set(vci.checkboxes, item, true);
//           });
//          vci.stopCollapse = false;
//          vci.showTagLoading = false;
//       }else{
//           vci.showAllTags(true).then(
//           function (){
              
//               filterIds.forEach( function(item){
//               vci.$set(vci.checkboxes, item, true);
//           });
//          vci.stopCollapse = false;
//          vci.showTagLoading = false;
              
//           }
                
//                 );
//       }

                 
          
//       });
                            
                            
      
      
//      } 
      
//   },
//     methods: {
//            toggleCollapse: function(dontTouchColapse = false, keepLoading=false){
//                if(!this.stopCollapse){
             
//                if(!dontTouchColapse){
//                this.showCollapse = !this.showCollapse;
//                }
//                let compTemp = this;
//                if(this.tags.length < 1 ){
//                  this.stopCollapse = true;    
//                     let vci = this;
//                           return this.$http
//       .get(this.tagsRoute.popularTags)
//       .then(function(response) {
//                 let data = response.data;
//                 if(data.hasOwnProperty('error')){
//                 vci.showError = true;    
//                 vci.errorMsg = data.error; 
//                 }else{
//                     vci.tags = response.data;
//                 }
                
                
                
//                 if(keepLoading){
//                      vci.showTagLoading = true;
//                 }else{
//                     vci.stopCollapse = false;
//                     vci.showTagLoading = false;
//                 }
                
                 
                
//       });   
                   
                   
//                } 
        
//                }
//               //setTimeout(function(){  compTemp.showTagLoading = false; }, 3000);
//            },
//            showAllTags: function(keepLoading=false){
//            this.tags = [];
//            this.stopCollapse = true;
//            this.showTagLoading = true;
           
           
//                                let vci = this;
//                           return this.$http
//       .get(this.tagsRoute.allTags)
//       .then(function(response) {
//                 let data = response.data;
//                 if(data.hasOwnProperty('error')){
//                 vci.showError = true;    
//                 vci.errorMsg = data.error; 
//                 }else{
//                     vci.tags = response.data;
//                 }
//                 vci.gotAllTags = true;
//                 if(!keepLoading){
//                 vci.stopCollapse = false;
//                 vci.showTagLoading = false;
//             }
//       }); 
           
           
//        },
//      showPopularOnly: function(){
//          this.showTagLoading = true;
//          this.gotAllTags = false;
//          this.tags = [];
//          this.toggleCollapse(true);
         
//      },
//      submitForm: function(){
//          let submitStr = "/tags/";
//          let ids = "";
//          for(const prop in this.checkboxes){
//             if(this.checkboxes[prop]){
//                 ids+=prop+'/';
//             }
//          }
//          submitStr+= ids+"tags";
           
//         let isNode=new Function("try {return this===global;}catch(e){return false;}")();
         
//         if(ids.length > 0) {
//             if(!isNode){
//                window.location.href = this.tagsRoute.filterUrl+submitStr;
//            }
//         }else{
//             if(!isNode){
//             window.location.href = this.tagsRoute.indexUrl;
//            }
//         }
   
//      }
     
//     } 
// }      

</script>
<div class="container-fluid ml-2">    
 
            <button class="row filterLink focus:ring-transparent"
            on:click={() => expanded = !expanded}
            aria-expanded={expanded}
            aria-controls="collapse-filter"
            >
            <span class="icon-caret-down">&nbsp;Filter by tag
                      </span>
            </button>
            {#if expanded}
            <div class="filtercard mt-2 p-2" transition:slide id="collapse-filter">
               {#if loadingTags}
                <div class="spinner-small"></div>
               {:else}
                <!-- v-if="this.tags.length > 0 && !showTagLoading" -->

                <form method='get' class='console.logainer-fluid' > 
                    <div class="row"> 
               <ul class="tagFilter">

                <!-- v-for="tag in tags" -->
                {#each tags as tag}
                <li>
                          <div class="rkmd-checkbox checkbox-rotate checkbox-ripple">
                  <label class="input-checkbox checkbox-lightBlue">

                    <!-- v-bind:id="'checkbox-'+tag.tag_id" name="tag[]"  v-bind:value="tag.tag_id"  v-model="checkboxes[tag.tag_id]" -->

                    <input id={`tag${tag.tag_id}`} value={tag.tag_id} type="checkbox" name="tag[]" bind:group={selectedTags} >
                    <span class="checkbox"></span>
                  </label>
                  <!-- v-bind:for="'checkbox-'+tag.tag_id" -->
                  <label for={`tag${tag.tag_id}`}  class="label"> { tag.name } ({tag.count })</label>
                </div>    
                   </li>
                    {/each}
           </ul>
                    </div>
                    <div class="row"> 
                    {#if !allTags}
                    <button class="filterLink" on:click={() => setTags(true)}> Show all tags …</button>
                    {:else}
                    <button class="filterLink" on:click={() => setTags(false)} > Show only popular tags …</button>
                    &nbsp;&nbsp;&nbsp;
                    {/if}
                     <input on:click|preventDefault={submitForm} style="border-radius: .125rem; font-size: 0.9em;" type="submit" value="Filter" class="button btn-search-box">
                    </div>
                </form>
                {/if}
            </div>
            {/if}
    </div>

