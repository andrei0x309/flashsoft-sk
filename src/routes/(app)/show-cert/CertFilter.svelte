<script lang="ts">

import CollapsibleSection from '@/components/Collapsible.svelte'


</script>


<div class="container-fluid">    
            <button class="row filterLink " @click="toggleCollapse()"
                 :class="showCollapse ? 'collapsed' : null"
                 aria-controls="collapse5"
                 :aria-expanded="showCollapse ? 'true' : 'false'"
            >
            <span class="icon-caret-down"> Filter by tag
                      </span>
            </button>
      
          <CollapsibleSection class="row mt-2" v-model="showCollapse" id="collapse5">
            <div class="filtercard">
                <div class="spinner-small"></div>
                <formv-if="this.tags.length > 0 && !showTagLoading" method='get' class='console.logainer-fluid' > 
                    <div class="row"> 
               <ul class="tagFilter">
                <li v-for="tag in tags">
                          <div class="rkmd-checkbox checkbox-rotate checkbox-ripple">
                  <label class="input-checkbox checkbox-lightBlue">
                    <input type="checkbox"  v-bind:id="'checkbox-'+tag.tag_id" name="tag[]"  v-bind:value="tag.tag_id"  v-model="checkboxes[tag.tag_id]" >
                    <span class="checkbox"></span>
                  </label>
                  <!-- <label v-bind:for="'checkbox-'+tag.tag_id" class="label"> {{ tag.name }} ({{ tag.tag_count }})</label> -->
                </div>    
      
                   </li>
           </ul>
                    </div><div class="row"> 
                    <button class="filterLink" v-if="!gotAllTags" @click="showAllTags()" > Show all tags …</button>
                    <button class="filterLink" v-if="gotAllTags" @click="showPopularOnly()" > Show only popular tags …</button>
                    &nbsp;&nbsp;&nbsp;
                     <input style="border-radius: .125rem; font-size: 0.9em;"  v-on:click="submitForm()" type="submit" value="Filter" class="button btn-search-box">
                    </div>
                </form>     
            </div>
          </CollapsibleSection>
    </div>