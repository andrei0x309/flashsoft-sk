<script lang="ts">
import { onMount } from 'svelte';

interface Props {
  maxPage: number;
  currentPage: number;
  rest: string;
}

let { maxPage, currentPage, rest }: Props = $props();
const isMinPage = currentPage === 1;
const isMaxPage = currentPage === maxPage;

onMount(() => {
  console.log('pag remounted', currentPage);
});

const linkList: (number | string)[] = [];
if (maxPage < 6) {
  for (let i = 1; i <= maxPage; i++) {
    linkList.push(i);
  }
} else {
  if (currentPage >= maxPage - 2) {
    linkList.push(1, 2, '...');
    if (currentPage === maxPage) {
      linkList.push(maxPage - 1, maxPage);
    } else {
      linkList.push(maxPage - 2, maxPage - 1, maxPage);
    }
  } else {
    if (currentPage <= 2) {
      linkList.push(1, 2);
      if (currentPage === 2) {
        linkList.push('...', currentPage + 1, currentPage + 2, currentPage + 3, '...', maxPage - 1, maxPage);
      } else {
        linkList.push('...', currentPage + 2, currentPage + 3, currentPage + 4, '...', maxPage - 1, maxPage);
      }
    } else {
      if (currentPage === 3) {
        linkList.push(1, 2, '...', currentPage, currentPage + 1, '...', maxPage - 1, maxPage);
      } else {
        linkList.push(1, 2, '...', currentPage - 1, currentPage, currentPage + 1, '...', maxPage - 1, maxPage);
      }
    }
  }
}
</script>

<nav aria-label="Pagination Navigation">
<ul class="pagination justify-center">
	<li aria-label="« Previous" class="page-item">
        {#if isMinPage}
            <span aria-hidden="true" class="page-link">‹</span>
        {:else}
            <a
                href={`${(`${rest}/page/${currentPage-1}`).replace(/\/+/g, '/')}`}
                rel="prev"
                aria-label="« Previous"
                class="page-link"
                >‹</a
            >
        {/if}
	</li>
    {#each linkList as link }
        {#if link === '...'}
            <li class="page-item disabled"><span class="page-link">...</span></li>
        {:else}
            {#if link === currentPage}
                <li aria-current="page" class="page-item active"><span class="page-link">{link}</span></li>
            {:else}
                <li class="page-item">
                    <a
                        href={`${(`${rest}/page/${link}`).replace(/\/+/g, '/')}`}
                        class="page-link"
                        >{link}</a
                    >
                </li>
            {/if}
        {/if}
    {/each}
	<li class="page-item">
        {#if isMaxPage}
            <span aria-hidden="true" class="page-link">›</span>
        {:else}
            <a
                href={`${(`${rest}/page/${currentPage+1}`).replace(/\/+/g, '/')}`}
                rel="next"
                aria-label="Next »"
                class="page-link"
                >›</a
            >
        {/if}
	</li>
</ul>
</nav>