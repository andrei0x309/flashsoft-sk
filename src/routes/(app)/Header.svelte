<script lang="ts">
	interface Props {
		segment: string;
		filter?: import('svelte').Snippet;
		search?: import('svelte').Snippet;
	}

	let { segment, filter, search }: Props = $props();
	let logoUrl = segment === 'cert' ? '/certs' : '/projects';
</script>

<header id="app-header" class="col header">
	<div class="row">
		<div class="col flex" style="flex:0.5;">
			<a style="text-decoration:none;" href={logoUrl}>
				<div class="headtitle-warp">
					{#if segment === 'cert'}
						<svg class="inline" width="100" height="100" viewBox="0 0 512 512"
							><title>certificate</title><g fill-rule="evenodd" stroke-linejoin="round"
								><circle cx="256" cy="256" r="256" fill="#272727" fill-opacity=".7"></circle><path
									d="M512 256L398.222 142.222 206.245 310.253l-92.467 59.525L256 512c141.384 0 256-114.616 256-256z"
									fill="#191919"
									fill-opacity=".8"
									fill-rule="nonzero"
								></path><path fill="#fff" d="M113.344 142.036h285.01v227.959h-285.01z"></path><path
									d="M398.354 377.985h-285.01a7.99 7.99 0 0 1-7.991-7.99V142.036a7.99 7.99 0 0 1 7.991-7.99h285.01a7.99 7.99 0 0 1 7.99 7.99v227.959a7.99 7.99 0 0 1-7.99 7.99zm0-235.949h-285.01v227.959h285.01V142.036z"
									fill-opacity=".7"
								></path><path fill="#e9eff4" d="M256.293 143.269h141.929v226.384H256.293z"
								></path><path
									d="M361.579 355.902H150.421c-10.659 0-19.299-8.64-19.299-19.299V175.397c0-10.659 8.64-19.299 19.299-19.299h211.156c10.659 0 19.299 8.64 19.299 19.299v161.206c.002 10.659-8.638 19.299-19.297 19.299z"
									fill="#f4e3c3"
									fill-rule="nonzero"
								></path><path
									d="M361.579 156.098H256.288v199.804h105.291c10.659 0 19.299-8.64 19.299-19.299V175.397c0-10.659-8.64-19.299-19.299-19.299z"
									fill="#fed8b2"
									fill-rule="nonzero"
								></path><path
									d="M349.091 396.283l-20.687-20.113-20.687 20.113v-60.337h41.374v60.337z"
									fill="#0041b9"
									fill-opacity=".65"
									fill-rule="nonzero"
								></path><path
									d="M349.091 335.946h-20.687v40.226l20.687 20.111v-60.337z"
									fill="#2318c8"
									fill-opacity=".67"
									fill-rule="nonzero"
								></path><circle cx="328.404" cy="323.439" r="28.444" fill="#ffaf50"></circle><path
									d="M356.848 323.448c0-15.71-12.734-28.444-28.444-28.444v56.889c15.71-.001 28.444-12.735 28.444-28.445z"
									fill="#cf8a01"
									fill-rule="nonzero"
								></path><path fill="#324a5e" d="M142.222 210.989h227.556v4.198H142.222z"
								></path><path fill="#324a5e" d="M142.222 234.072h227.556v4.198H142.222z"
								></path><path fill="#324a5e" d="M142.222 257.155h227.556v4.198H142.222z"
								></path><path fill="#324a5e" d="M142.222 280.238h85.333v4.198h-85.333z"></path><path
									fill="#324a5e"
									d="M213.333 187.906h85.333v4.198h-85.333z"
								></path><g
									><path fill="#2b3b4e" d="M256.293 210.989h113.49v4.198h-113.49z"></path><path
										fill="#2b3b4e"
										d="M256.293 234.072h113.49v4.198h-113.49z"
									></path><path fill="#2b3b4e" d="M256.293 257.155h113.49v4.198h-113.49z"
									></path><path fill="#2b3b4e" d="M256.293 187.906h42.379v4.198h-42.379z"></path></g
								></g
							></svg
						>
						<h1 class="headtitle">Courses & Certs DB</h1>
					{:else}
						<svg class="inline" width="100" height="100" viewBox="0 0 512 512"
							><title>project</title><g fill-rule="evenodd" stroke-linejoin="round"
								><circle cx="256" cy="256" r="256" fill="#414952"></circle><path
									d="M512 256l-70.786-138.531-6.979 255.97-378.432 4.807L256 512c141.384 0 256-114.616 256-256z"
									fill="#23272b"
									fill-opacity=".8"
									fill-rule="nonzero"
								></path><path
									d="M55.803 117.469l384.241 1.117v259.226H57.324l-1.169-200.081 66.868-60.066-67.22-.196z"
									fill="#fff"
								></path><path d="M123.483 117.469l-67.68 59.668 66.978 18.194" fill="#dbe1ec"
								></path><path fill="#e9e9e9" d="M55.803 247.64h384.24v130.171H55.803z"></path><path
									fill="#f3ca00"
									d="M167.024 89.492h48.783v273.159h-48.783z"
								></path><path fill="#e7a003" d="M167.024 166.724h36.523v11.691h-36.523z"
								></path><path fill="#e7a003" d="M166.986 139.044h24.43v11.691h-24.43z"></path><path
									fill="#e7a003"
									d="M166.986 110.286h36.523v11.691h-36.523z"
								></path><g
									><path fill="#e7a003" d="M167.062 248.444h36.523v11.691h-36.523z"></path><path
										fill="#e7a003"
										d="M167.024 220.765h24.43v11.691h-24.43z"
									></path><path fill="#e7a003" d="M167.024 192.006h36.523v11.691h-36.523z"
									></path></g
								><g
									><path
										d="M203.623 330.165H167.1v11.691h36.523v-11.691zm-12.131-27.68h-24.43v11.691h24.43v-11.691zm12.093-28.758h-36.523v11.691h36.523v-11.691z"
										fill="#e7a003"
									></path></g
								><g
									><path
										d="M236.019 247.64h39.788v77.248h82.019l-56.879-77.248h42.539l59.287 83.802 20.693 30.464H236.019V247.64z"
										fill="#f39a00"
									></path><path
										d="M275.807 247.64h-39.788V89.077l35.004 56.137 72.463 102.426h-42.539l-25.14-34.142v34.142z"
										fill="#f3ca00"
									></path></g
								></g
							></svg
						>
						<h1 class="headtitle">Projects DB</h1>
					{/if}
				</div>
			</a>
			<nav class="skew-menu top-[1rem] relative">
				<ul>
					<li><a href="/"><span class="icon-arrow-left"></span> Front Page</a></li>
					<li>
						<a href="/certs" class={segment === 'cert' ? 'active' : ''}
							><span class="icon-list"></span> Cert DB</a
						>
					</li>
					<li>
						<a href="/projects" class={segment === 'projects' ? 'active' : ''}
							><span class="icon-server"></span> Projects DB</a
						>
					</li>
					<li>
						<a class="flex" href="https://blog.flashsoft.eu" rel="extrenal"
							><svg
								style="width: 1rem; margin-right: 0.5rem;"
								class="inline"
								enable-background="new 0 0 512 512"
								id="Layer_1"
								version="1.1"
								viewBox="0 0 512 512"
								xml:space="preserve"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								><g
									><g
										><path
											d="M128.3,28.7l0.1,340c-0.1,31.9,19.9,29.4,27.1,29.4h248.1c38.5,0,37.1-26.8,37.1-33.8V34    c2.1-34.1-25.1-34.1-32.3-34.1H155.5C148.3-0.1,128.2,4.8,128.3,28.7z M374,169.7H189.5c-7.2,0-13.5-5.3-13.5-12.3V73.1    c0-7,6.8-15.1,14-15.1h184.5c7.2,0,13.5,6.7,13.5,13.7V156C388,163,381.2,169.7,374,169.7z"
											fill="currentColor"
										/></g
									><polygon
										fill="currentColor"
										points="224.8,512.8 176.6,498.7 128.4,512.8 128.4,424.1 224.8,424.1  "
									/><g
										><path
											d="M437.5,450.3c-10-16-8.6-50.7,0.2-69.5h-15.9c-8.5,17.5-8.9,45.8,0,63.1H238.4V458l199.4,0   c2.9-1.3,1.5-4.9,0-7.7L437.5,450.3z"
											fill="currentColor"
										/><path
											d="M71.7,60.3l-0.2,382.6c-0.3,16.2,15.2,16.3,28.4,15.1h6.1l0.1-12.2c-19.3,4.6-35.1-40.2-0.4-47.9l0-395.5    C82.9,5.8,68.1,27,71.7,60.3z"
											fill="currentColor"
										/></g
									></g
								></svg
							>Blog</a
						>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	{@render filter?.()}
	{@render search?.()}
</header>
