<script lang="ts">
  import { slide } from "svelte/transition";
  import { goto } from "$app/navigation";

  interface Props {
    expanded?: boolean;
    searchInput?: string;
  }

  let { expanded = $bindable(false), searchInput = $bindable("") }: Props = $props();
  let error = $state("");

  const submitForm = (e: Event) => {
    e.preventDefault();
    const searchTerms = encodeURI(
      (searchInput ?? "")
        .split(" ")
        .filter((term: string) => term.length >= 2)
        .join(" "),
    );

    if (searchTerms.length > 0) {
      goto(`/certs/search?q=${searchTerms}`);
    } else {
      error = "Please enter at least 2 characters to search!";
    }
  };
</script>

<div class="container-fluid ml-2 mb-2">
  <button
    class="row filterLink focus:ring-0 focus:ring-offset-0"
    onclick={() => (expanded = !expanded)}
    aria-expanded={expanded}
    aria-controls="collapse-search"
  >
    <span class="icon-caret-down focus:ring-0 focus:ring-offset-0">&nbsp;Search </span>
  </button>
  {#if expanded}
    <div class="filtercard mt-2 p-2" id="collapse-serach" transition:slide|global>
      <div class="row">
        <div class="grid">
          <form method="post" class="container-fluid search">
            <div class="form__field justify-center">
              <input
                type="search"
                placeholder="What are you looking for?"
                class="form__input max-w-md"
                bind:value={searchInput}
              />
              <button
                class="button bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2 cursor-pointer"
                onclick={submitForm}
              >Search</button>
            </div>
          </form>

          {#if error}
            <div class="search-results max-w-200 mx-auto text-center px-4">{error}</div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>
