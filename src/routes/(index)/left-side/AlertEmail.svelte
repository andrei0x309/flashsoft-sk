<script lang="ts">
interface Props {
  showAlert?: boolean;
  msg?: string;
  type?: string;
}

let { showAlert = $bindable(false), msg = $bindable(''), type = $bindable('error') }: Props = $props();
</script>
{#if showAlert}
{#if type === 'error'}
<div id="alert-box" class="alert-base alert-error alert flex flex-row items-center bg-red-200 p-5 rounded border-b-2 border-red-300 fade-in relative">
    <button class="alert-close" onclick={() => {showAlert = false}} aria-label="close">x</button>
    <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-10 w-10 flex-shrink-0 rounded-full mt-[1.3rem]">
        <span class="text-red-500">
            <svg fill="currentColor"
                 viewBox="0 0 20 20"
                 class="h-6 w-6">
                <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>
    <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-red-800">
            Error
        </div>
        <div class="alert-description text-sm text-red-600">
            {msg}
        </div>
    </div>
</div>
{:else if type === 'success'}
<div id="alert-box" class="alert-base alert flex flex-row items-center bg-green-200 p-5 rounded border-b-2 border-green-300 fade-in relative">
    <button class="alert-close" onclick={() => {showAlert = false}} aria-label="close">x</button>
    <div class="alert-icon flex items-center bg-green-100 border-2 border-green-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span class="text-green-500">
            <svg fill="currentColor"
                 viewBox="0 0 20 20"
                 class="h-6 w-6">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>
    <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-green-800">
            Success
        </div>
        <div class="alert-description text-sm text-green-600">
            {msg}
        </div>
    </div>
</div>
{:else if type === 'info'}
<div id="alert-box" class="alert-base alert flex flex-row items-center bg-blue-200 p-5 rounded border-b-2 border-blue-300 fade-in relative">
    <button class="alert-close" onclick={() => {showAlert = false}} aria-label="close">x</button>
    <div class="alert-icon flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
        <span class="text-blue-500">
            <svg fill="currentColor"
                 viewBox="0 0 20 20"
                 class="h-6 w-6">
                <path fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"></path>
            </svg>
        </span>
    </div>
    <div class="alert-content ml-4">
        <div class="alert-title font-semibold text-lg text-blue-800">
            Info
        </div>
        <div class="alert-description text-sm text-blue-600">
            {msg}
        </div>
    </div>
</div>
{/if}
{/if}