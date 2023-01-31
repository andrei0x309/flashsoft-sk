<script lang="ts">
export let expanded: boolean = false;
export let searchInput: string = '';
import { slide } from 'svelte/transition';
import { goto } from '$app/navigation';
let error = ''

const submitForm = () => {
   const searchTerms = encodeURI((searchInput ?? '').split(' ').filter((term: string) => term.length >= 2).join(' '))

   if(searchTerms.length > 0){
      goto(`/certs/search?q=${searchTerms}`);
   } else {
     error = 'Please enter at least 2 characters to search!'
   }
}

//     export default {
//     data() {
//       return {
//         showCollapse: false,
//         query: "",
//         showResults: false,
//         msgResults: '',
//         showError: false,
//         stopCollapse: false,
//         gotAllTags: false,
//         errorMsg: "",
//         checkboxes: {},
//         tags: []
//       };
//     },
//     props: ["searchRoute"],
//     created() {
//       let url = "";
//       if(typeof window === "undefined"){
//          url = this.searchRoute.indexUrl;
//       }else{
//          url = window.location.href;
//       }       
//       if(url.indexOf(this.searchRoute.searchRoute) === 0){
//       let query= url.replace(this.searchRoute.searchRoute+"/",'');
//       let sepPosition = query.indexOf("/");
//       if( sepPosition < 0 ) {
//            sepPosition = query.indexOf("?");
//       }
      
//       if( sepPosition > 0 ){
//          query = query.slice(0, sepPosition);
//       }
//       this.query = decodeURI(query);
                      
                      
//        if(this.searchRoute.nrResults){
       
//        this.msgResults = 'For the search query <b class="highlight">'+ this.query +'</b> you got a total of <b class="highlight">'+ this.searchRoute.nrResults +'</b> results.';                       
//        this.showResults = true;
//        this.showCollapse = true;   
//       }
      
   
//       }
  
   
//     },
//     methods: {
//       toggleCollapse: function(dontTouchColapse = false, keepLoading = false) {
//         if (!this.stopCollapse) {
//           if (!dontTouchColapse) {
//             this.showCollapse = !this.showCollapse;
//           }
   
//         }
        
//       },
      
//       submitForm: function() {
  
         
//         if (this.query.length > 0) {
//               if(typeof window !== "undefined"){
//               window.location.href = this.searchRoute.searchRoute + "/" + this.query;
//              }
//         } else {
//              if(typeof window !== "undefined"){
//                 window.location.href = this.searchRoute.indexUrl;
//              }
//         }
//       }
//     }
//   };

</script>
    <div class="container-fluid ml-2 mb-2">
      <button
        class="row filterLink focus:ring-0 focus:ring-offset-0"
        on:click={() => expanded = !expanded}
        aria-expanded={expanded}
        aria-controls="collapse-search"

      >
        <span class="icon-caret-down focus:ring-0 focus:ring-offset-0">&nbsp;Search
                  </span>
      </button>
        {#if expanded}
        <div class="filtercard mt-2 p-2" id="collapse-serach" transition:slide>
          <div class="row">
            <div class="grid">
              <form

                
                method="post"
                class="container-fluid search"
              > <!-- v-if="this.tags.length > 0 && !showTagLoading" -->
              <!-- v-model="query" -->
                <div class="form__field justify-center">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    class="form__input max-w-[18rem]"
                    bind:value={searchInput}
                  >
                  <!-- v-on:click="submitForm()" -->
                  <input type="submit" value="Search" class="button" on:click|preventDefault={submitForm}>
                </div>
              </form>
              <!-- v-if="showResults"  -->
              <!-- v-html="msgResults" -->
              {#if error}
                <div class="search-results max-w-[50rem] mx-auto text-center px-4" >{error}</div>
              {/if}
                
            </div>
          </div>
        </div>
        {/if}
    </div>
