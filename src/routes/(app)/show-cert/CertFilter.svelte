<script lang="ts">

import CollapsibleSection from '@/components/Collapsible.svelte'


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


<div class="container-fluid">    


  <!-- @click="toggleCollapse()"
  :class="showCollapse ? 'collapsed' : null"
  aria-controls="collapse5"
  :aria-expanded="showCollapse ? 'true' : 'false'" -->

            <button class="row filterLink "
            >
            <span class="icon-caret-down"> Filter by tag
                      </span>
            </button>
            <!-- class="row mt-2"  id="collapse5" -->
          <CollapsibleSection headerText={true} >
            <div class="filtercard">
                <div class="spinner-small"></div>
                <!-- v-if="this.tags.length > 0 && !showTagLoading" -->

                <form method='get' class='console.logainer-fluid' > 
                    <div class="row"> 
               <ul class="tagFilter">

                <!-- v-for="tag in tags" -->

                <li>
                          <div class="rkmd-checkbox checkbox-rotate checkbox-ripple">
                  <label class="input-checkbox checkbox-lightBlue">

                    <!-- v-bind:id="'checkbox-'+tag.tag_id" name="tag[]"  v-bind:value="tag.tag_id"  v-model="checkboxes[tag.tag_id]" -->

                    <input type="checkbox" >
                    <span class="checkbox"></span>
                  </label>
                  <!-- <label v-bind:for="'checkbox-'+tag.tag_id" class="label"> {{ tag.name }} ({{ tag.tag_count }})</label> -->
                </div>    
      
                   </li>
           </ul>
                    </div><div class="row"> 
                      <!-- v-if="!gotAllTags" @click="showAllTags()"  -->
                    <button class="filterLink" > Show all tags …</button>
                    <!-- v-if="gotAllTags" @click="showPopularOnly()" -->
                    <button class="filterLink" > Show only popular tags …</button>
                    &nbsp;&nbsp;&nbsp;
                    <!-- v-on:click="submitForm()" -->
                     <input style="border-radius: .125rem; font-size: 0.9em;" type="submit" value="Filter" class="button btn-search-box">
                    </div>
                </form>     
            </div>
          </CollapsibleSection>
    </div>