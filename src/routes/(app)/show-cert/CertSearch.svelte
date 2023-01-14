<script lang="ts">
let expanded: boolean = false;
import { slide } from 'svelte/transition';


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
    <div class="container-fluid">
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
        <div class="filtercard mt-2" id="collapse-serach" transition:slide>
          <div class="row">
            <div class="grid">
              <form

                
                method="post"
                class="container-fluid search"
              > <!-- v-if="this.tags.length > 0 && !showTagLoading" -->
              <!-- v-model="query" -->
                <div class="form__field">
                  <input
                    type="search"
                    placeholder="What are you looking for?"
                    class="form__input"
                  >
                  <!-- v-on:click="submitForm()" -->
                  <input type="submit" value="Search" class="button">
                </div>
              </form>
              <!-- v-if="showResults"  -->
              <!-- v-html="msgResults" -->
                <div class="search-results" ></div>
                
            </div>
          </div>
        </div>
        {/if}
    </div>
