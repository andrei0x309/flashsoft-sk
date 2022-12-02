<script lang="ts">

import CollapsibleSection from '@/components/Collapsible.svelte'


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