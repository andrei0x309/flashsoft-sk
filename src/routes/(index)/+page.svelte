<script lang="ts">
	// import Counter from './Counter.svelte';
	// import welcome from '$lib/images/svelte-welcome.webp';
	// import welcome_fallback from '$lib/images/svelte-welcome.png';
	// import { BC_VERSION, BC_SK_VERSION } from '$lib/config';
	import { Swipe } from '$lib/utils/swipe';
	import AlertEmail from './AlertEmail.svelte';
	import { onMount } from 'svelte';

	const pageDescription = 'Web & App Development Portfolio & Software Developer Profile portal, you can access public my repositories on my GitLab instance.';
	const pageTitle = 'Web & App Development Portfolio - Software Dev Profile - flashsoft.eu';

	let showAlert: boolean = false;
	let alertMsg: string = '';
	let alertType: string = 'error';

	let hcaptchaElement: HTMLElement;
	let email: string = '';
	let name: string = '';
	let message: string = '';
	let mailForm: HTMLElement;
	let spinner: HTMLElement;
	let toggle: HTMLElement; // document.getElementById('menu_toggle');
	let sideMenu: HTMLElement; // document.getElementById('side-menu');
	let close: HTMLElement; // document.getElementById('menu-close');

	const showAlertElement = (msg: string, type: string) => {
		showAlert = true;
		alertMsg = msg;
		alertType = type;
	};

	const toggeleMenu = () => {
	sideMenu.classList.add('sideMenuToggle');
    const menuLinks = sideMenu?.querySelector('.sidebar-menu-nav')?.querySelectorAll('.sidemenu');
    if(menuLinks){
    let i = 1;
    for (const menuLink of menuLinks as unknown as HTMLElement[]){
        const timeout = 130 * i;
        setTimeout( () => {
             menuLink.style.animation = 'menuLinkSlideLeft 0.8s ease-in forwards;';
        },timeout );
        i++;
     }
    }
	};

	const closeMenu = () => {
		sideMenu?.classList.remove("sideMenuToggle");
	}

	const setLoadEmail = (isSending = true) => {
		if(isSending) {
		if(mailForm){
			mailForm.style.display = 'none';
		}
		if(spinner){
			spinner.style.display = 'inline-block';
		}
		} else {
		if(mailForm){
			mailForm.style.display = 'block';
		}
		if(spinner){
			spinner.style.display = 'none';
		}
		}
	}



onMount(() => {
	new Swipe(sideMenu, function(event: unknown, direction: string) {
	//event.preventDefault();
	if (direction === "left") {
		closeMenu()
	}
})
})
	
	const submitEmail = async () => {

		setLoadEmail(true)
		const data = {
			email,
			name,
			message,
			hCaptcha: hcaptchaElement.getAttribute('data-hcaptcha-response')
		};
		setLoadEmail(false)
		const recentEmail = localStorage.getItem('recent-email')
		if(recentEmail) {
			const num = isNaN(parseInt(recentEmail)) ? 0 : parseInt(recentEmail);
			const date = new Date( num  );
			const now = new Date();
			if(date.getTime() + 6e5 > now.getTime()) {
				showAlertElement('You sent an email recently', 'error');
				return;
			}
		}

		const response = await fetch('/edge-api/index/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		setLoadEmail(false)
		if(response.ok) {
			showAlertElement('Email sent!', 'success');
			localStorage.setItem('recent-email', new Date().getTime().toString());
		} else {
			showAlertElement('Email not sent due to an error', 'error');
		}
};	

export let data: any;

const html = data?.html;

</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://flashsoft.eu" />
	<meta property="og:image" content="https://flashsoft.eu/res/flashsoftLogo.png" />

	<!-- Schema  -->
	<script type="application/ld+json">
	{
	"@context": "http://schema.org",
	"@type": "Organization",
	"name": "FlashSoft",
	"url": "https://flashsoft.eu",
	"logo": "https://flashsoft.eu/res/android-chrome-256x256.png",
	"sameAs": [
		"https://twitter.com/andrei0x309"
	]
	}
	</script>
</svelte:head>

<main id="main" class="relative top-0 right-0 w-full overflow-visible">
	<div id="left-side" class="lfc h-full pt-14 overflow-y-scroll overflow-x-hidden w-full md:w-3/5 ">
		<section id="section-projects">
			<div class="ls-h mb-4 relative">
				<button
					bind:this={toggle}
					aria-label="Open Side Menu"
					id="menu_toggle"
					class="icon-bars menu-phone inline md:hidden "
					on:click={toggeleMenu}
				/>
				<p class="inline-block my-1">projects</p>
			</div>
			<div class="ls-pr-ct flex -mr-4 -ml-4 text-center p-6 justify-center flex-col items-center">
				<!-- <h1>
					Visit my own <a
						rel="noopener"
						href="https://gitlab.flashsoft.eu/explore/projects?sort=created_desc"
						class="gitlab-button">GitLab instance server</a
					> to see some of the public git repositories containing open source code .
				</h1>
				<a
					rel="noopener"
					href="https://gitlab.flashsoft.eu/explore/projects?sort=latest_activity_desc"
				>
					<img
						srcset="/res/gitlabpreview-1-2.png 2x,
                                                 /res/gitlabpreview-1-3.png 3x,
                                                 /res/gitlabpreview.png 4x"
						src="res/gitlabpreview.png"
						alt="flashsoft.eu gitlab server"
						width="550"
						height="259"
					/>
				</a> -->
				{#if html}
				<div class="github-contributions">
					{@html html}
				</div>
				{/if}
				<p>
					Visit <a href="/show-cert" class="gitlab-button">Courses DB</a> or <a href="/projects" class="gitlab-button">Projects</a>.
				</p>
			</div>
		</section>
		<section id="section-skills">
			<div class="ls-h ls-skh mb-4"><p class="my-1">Skills</p></div>
			<div class="ls-skh ls-sk-ct">
				<ul class="mb-8">
					<li><h2>back end development</h2></li>
					<li><h2>front end development</h2></li>
					<li><h2>mobile / desktop app development</h2></li>
					<li><h2>network and server administration</h2></li>
				</ul>
			</div>
		</section>

		<section id="section-tech">
			<div class="l-w-bg icos -mb-8">
				<h3><span>Technologies I've worked with</span></h3>

				<img
					src="/res/devicon/amp/amp-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="AMP logo"
				/>

				<img
					src="/res/devicon/html5/html5-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="html5 logo"
				/>

				<img
					src="/res/devicon/css3/css3-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="css3 logo"
				/>

				<img
					src="/res/devicon/sass/sass-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="sass logo"
				/>

				<img
					src="/res/devicon/tailwind/tailwind-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="tailwind logo"
				/>

				<img
					src="/res/devicon/javascript/javascript-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="javascript logo"
				/>

				<img
					src="/res/devicon/typescript/typescript-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="Webpack logo"
				/>

				<img
					src="/res/devicon/react/react-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="react logo"
				/>

				<img
					src="/res/devicon/vuejs/vuejs-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="vue logo"
				/>

				<img
					src="/res/devicon/angularjs/angularjs-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="Angular logo"
				/>

				<img
					src="/res/devicon/python/python-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="python logo"
				/>

				<img
					src="/res/devicon/php/php-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="php logo"
				/>

				<img
					src="/res/devicon/nodejs/nodejs-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="nodejs logo"
				/>

				<img
					src="/res/devicon/c/c-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="c-lang logo"
				/>

				<img
					src="/res/devicon/cplusplus/cplusplus-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="cplusplus-lang logo"
				/>

				<img
					src="/res/devicon/qt/qt-round.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="qt logo"
				/>

				<img
					src="/res/devicon/csharp/csharp-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="csharp-lang logo"
				/>

				<img
					src="/res/devicon/dot-net/dot-net-plain-wordmark.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="dot-net logo"
				/>

				<img
					src="/res/devicon/kotlin/kotlin-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="java logo"
				/>

				<img
					src="/res/devicon/java/java-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="java logo"
				/>

				<img
					src="/res/devicon/laravel/laravel-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="laravel logo"
				/>

				<img
					src="/res/devicon/symfony/symfony-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="symfony logo"
				/>

				<img
					src="/res/devicon/codeigniter/codeigniter-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="codeigniter logo"
				/>

				<img
					src="/res/devicon/flask/flask-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="flask logo"
				/>

				<img
					src="/res/devicon/ssh/ssh-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="ssh logo"
				/>

				<img
					src="/res/devicon/bash/bash-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="bash logo"
				/>

				<img
					src="/res/devicon/autoit/autoit.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="autoit logo"
				/>

				<img
					src="/res/devicon/linux/toxOpt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="linux logo"
				/>

				<img
					src="/res/devicon/debian/debian-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="debian logo"
				/>

				<img
					src="/res/devicon/redhat/redhat-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="redhat logo"
				/>

				<img
					src="/res/devicon/ubuntu/ubuntu-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="ubuntu logo"
				/>

				<img
					src="/res/devicon/docker/docker-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="ubuntu logo"
				/>

				<img
					src="/res/devicon/nginx/nginx.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="linux logo"
				/>

				<img
					src="/res/devicon/apache/apache-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="apache logo"
				/>

				<img
					src="/res/devicon/oracle/oracle-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="oracle logo"
				/>

				<img
					src="/res/devicon/postgresql/postgres-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="postgres logo"
				/>

				<img
					src="/res/devicon/mysql/mysql-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="mysql logo"
				/>

				<img
					src="/res/devicon/redis/redis-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="redis logo"
				/>

				<img
					src="/res/devicon/mongodb/mongodb-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="mongodb logo"
				/>

				<img
					src="/res/devicon/android/android-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="android logo"
				/>

				<img
					src="/res/devicon/ionic/ionic-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="ionic logo"
				/>

				<img
					src="/res/devicon/gradle/gradle-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="gradle logo"
				/>

				<img
					src="/res/devicon/composer/composer-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="composer logo"
				/>

				<img
					src="/res/devicon/npm/npm-original-wordmark.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="composer logo"
				/>

				<img
					src="/res/devicon/yarn/yarn-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="composer logo"
				/>

				<img
					src="/res/devicon/git/git-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="git logo"
				/>

				<img
					src="/res/devicon/gitlab/gitlab-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="github logo"
				/>

				<img
					src="/res/devicon/github/github-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="github logo"
				/>

				<img
					src="/res/devicon/visualstudio/visualstudio-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="visualstudio logo"
				/>

				<img
					src="/res/devicon/netbeans/netbeans-opt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="netbeans logo"
				/>

				<img
					src="/res/devicon/eclipse/eclipseOpt.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="eclipse logo"
				/>

				<img
					src="/res/devicon/photoshop/photoshop-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="photoshop logo"
				/>

				<img
					src="/res/devicon/inkscape/inkscape-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="inkscape logo"
				/>

				<img
					src="/res/devicon/materialui/materialui-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="bootstrap logo"
				/>

				<img
					src="/res/devicon/bulma/bulma.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="bulma logo"
				/>

				<img
					src="/res/devicon/bootstrap/bootstrap-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="bootstrap logo"
				/>

				<img
					src="/res/devicon/jquery/jquery-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="jquery logo"
				/>

				<img
					src="/res/devicon/webpack/webpack-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="Webpack logo"
				/>

				<img
					src="/res/devicon/moodle/moodle-original.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="moodle logo"
				/>

				<img
					src="/res/devicon/wordpress/wordpress-plain.svg"
					width="64"
					height="64"
					loading="lazy"
					alt="wordpress logo"
				/>
			</div>
		</section>

		<section id="section-interests">
			<div class="l-w-bg">
				<h3><span>Topics I follow</span></h3>

				<ul class="tags mb-6">
					<li><span class="taglink">GP programming / scripting <span>99</span></span></li>
					<li><span class="taglink">computer science <span>98</span></span></li>
					<li><span class="taglink">web development <span>96</span></span></li>
					<li><span class="taglink">web design <span>93</span></span></li>
					<li><span class="taglink">mobile app development <span>93</span></span></li>
					<li><span class="taglink">RDBMS <span>90</span></span></li>
					<li><span class="taglink">NoSQL databases <span>87</span></span></li>
					<li><span class="taglink">cloud computing <span>84</span></span></li>
					<li><span class="taglink">SEO <span>81</span></span></li>
					<li><span class="taglink">hybrid applications <span>78</span></span></li>
					<li><span class="taglink">native applications <span>75</span></span></li>
					<li><span class="taglink">network systems <span>72</span></span></li>
					<li><span class="taglink">network security <span>70</span></span></li>
					<li><span class="taglink">emulators & VMs <span>69</span></span></li>
					<li><span class="taglink">software RE <span>66</span></span></li>
					<li><span class="taglink">malware RE <span>60</span></span></li>
					<li><span class="taglink">OSs APis <span>57</span></span></li>
					<li><span class="taglink">IDEs <span>54</span></span></li>
					<li><span class="taglink">biometrics security <span>50</span></span></li>
					<li><span class="taglink">open source <span>48</span></span></li>
					<li><span class="taglink">AI & ML & DL & GANs <span>46</span></span></li>
					<li><span class="taglink">VR & AR <span>46</span></span></li>
				</ul>

				<ul class="tags green mb-6">
					<li><span class="taglink">automation <span>30</span></span></li>
					<li><span class="taglink">open hardware <span>28</span></span></li>
					<li><span class="taglink">circuit design <span>26</span></span></li>
					<li><span class="taglink">arduino compatible <span>24</span></span></li>
					<li><span class="taglink">embeded systems<span>21</span></span></li>
					<li><span class="taglink">NFC apps<span>21</span></span></li>
					<li><span class="taglink">dev boards <span>22</span></span></li>
				</ul>

				<ul class="tags blue mb-6">
					<li><span class="taglink">reading sci-fi and technical books <span>20</span></span></li>
					<li><span class="taglink">technology <span>18</span></span></li>
					<li><span class="taglink">gaming <span>16</span></span></li>
					<li><span class="taglink">running <span>14</span></span></li>
					<li><span class="taglink">philosophy <span>12</span></span></li>
					<li><span class="taglink">politics <span>10</span></span></li>
				</ul>
			</div>
		</section>

		<section id="section-contact">
			<div class="ls-h mb-0">
				<h2 class="my-3">Contact form</h2>
			</div>
			<div id="ls-ct-fr" class="ls-ct-fr">
				<div  bind:this={spinner} id="spinner" class="spinner spinner__1" />
				<AlertEmail bind:showAlert={showAlert} bind:msg={alertMsg} bind:type={alertType} />
				<form bind:this={mailForm} id="mail-form">
					<input  bind:value={name} id="form-name" name="name" type="text" placeholder="Name" />
					<input  bind:value={email} id="form-email" name="email" type="email" placeholder="Email" />
					<textarea bind:value={message} id="form-message" name="message" cols="30" rows="5" placeholder="Message" />

					<div bind:this={hcaptchaElement} class="h-captcha flex justify-center" data-theme="dark" data-sitekey="c529949f-b6e7-4e97-af3a-0ddb0f7c1c5a"></div>
					<script src="https://js.hcaptcha.com/1/api.js" async defer></script>
					<button on:click|preventDefault={submitEmail} id="form-submit" type="submit" value="Send" class="btn-submit"
						><i class="icon-paper-plane-o" />&nbsp;Send&nbsp;</button
					>
				</form>
			</div>
		</section>
		<footer class="left-side-footer">
			<p>Powerd by netlify, deno on edge, SvelteKit</p>
			<!-- <p>APP Version - {BC_VERSION}</p>
			<p>SvelteKit Version {BC_SK_VERSION}</p> -->
			<!-- <a rel="noopener nofollow" href="https://www.codewars.com/r/GFQ2Gg"><p>Join CodeWars: <span class="icon-codewars">.</span></p></a>
            <a rel="nofollow"  href="{{ route ('adminHome') }}"><p>Admin Panel</p></a> -->
		</footer>
	</div>

	<nav bind:this={sideMenu} id="side-menu" class="fixed w-11/12 h-full top-0 left-0 overflow-auto bg-white">
		<button on:click={closeMenu} bind:this={close} aria-label="Close Side Menu" id="menu-close">×</button>

		<ul class="sidebar-menu-nav">
			<li class="sidemenu">
				<a id="lsm-projects" href="#section-projects"
					><i class="icon-home text-custom-v" aria-hidden="true" />Projects</a
				>
			</li>
			<li class="sidemenu">
				<a id="lsm-skills" href="#section-skills"
					><i class="icon-user-circle-o text-custom-v" aria-hidden="true" />Skills</a
				>
			</li>
			<li class="sidemenu">
				<a id="lsm-tech" href="#section-tech"
					><i class="icon-server text-custom-v" aria-hidden="true" />Technology</a
				>
			</li>
			<li class="sidemenu">
				<a id="lsm-interests" href="#section-interests"
					><i class="icon-tags text-custom-v" aria-hidden="true" />Interests</a
				>
			</li>
			<li class="sidemenu">
				<a id="lsm-contact" href="#section-contact"
					><i class="icon-envelope text-custom-v" />Contact</a
				>
			</li>
		</ul>
		<div class="rst-sb text-2xl mt-16 ">
			<p class="text-gray-900 ">
				andrei<svg width="142mm" height="142mm" viewBox="0 0 142 142" class="at-sign-sidebar">
					<g id="at-sign-path">
						<path
							d="m 129.94822,123.8006 -2.13934,-4.91613 -6.60045,-14.47527 c -2.31276,0.18272 -4.77602,2.20598 -6.82795,3.23181 -4.64383,2.32205 -9.35403,4.5567 -14.20215,6.5095 -10.871204,4.37863 -23.546354,7.23572 -35.232264,6.09955 -1.63571,-0.15896 -3.28261,-0.11417 -4.91613,-0.27312 -6.61383,-0.64292 -13.75287,-3.31702 -19.11828,-7.19202 -11.972,-8.64665 -15.5664,-23.020874 -14.20215,-37.053144 0.85347,-8.77856 2.51651,-17.3299 6.32733,-25.39999 7.01778,-14.86146 21.88251,-26.792215 38.46407,-28.404295 14.79181,-1.43808 30.259594,3.40922 39.238084,15.840855 2.74839,3.80563 4.33329,8.32109 5.46236,12.83655 2.17703,8.70865 0.86579,19.29827 -3.14086,27.31183 -2.14971,4.29915 -5.73521,8.2845 -10.87939,8.2845 -5.783824,0 -3.465054,-7.21934 -2.731184,-10.74256 1.607854,-7.71696 3.022334,-15.51176 4.734234,-23.21506 0.92259,-4.15194 1.36805,-8.4836 2.54901,-12.56344 -1.46801,-0.61806 -3.57539,-0.27311 -5.18924,-0.27311 H 90.619186 c -12.76883,0 -27.56665,1.14627 -37.96344,9.37696 -5.38781,4.26557 -9.05469,10.28018 -12.06282,16.29615 -4.48597,8.97194 -7.91551,22.52843 -1.50215,31.4086 7.07813,9.800304 21.14099,11.703124 32.13701,8.648844 2.47664,-0.68799 4.86314,-1.77773 7.10107,-2.95897 1.04796,-0.55306 2.64734,-2.194237 3.82366,-2.275897 1.15447,-0.0803 2.89587,1.897907 3.82366,2.503677 2.02981,1.3249 4.45537,2.41109 6.82795,3.0043 8.765464,2.19123 18.807754,0.96793 26.765594,-3.23208 8.30498,-4.383004 14.14452,-12.478504 17.57052,-20.984494 8.04688,-19.9786 5.27337,-43.03852 -9.37697,-59.266655 C 122.94,16.584831 116.63097,12.492121 110.2837,9.3185216 89.842436,-0.90203883 63.484886,-1.3509608 43.096606,9.4096216 24.308576,19.325531 10.859856,37.417696 5.2241957,57.706016 c -1.76538,6.35546 -2.46282,12.61233 -3.09533,19.11828 -1.50597998,15.49017 3.13602,31.772934 13.6559103,43.425804 4.6822,5.18651 10.53821,9.28684 16.66022,12.51783 7.4482,3.93099 16.21066,6.33306 24.58064,7.14668 3.88811,0.378 7.86553,0.92342 11.74408,0.54624 1.98421,-0.19282 4.0244,0.19282 6.00861,0 4.09622,-0.39821 8.24298,-0.76063 12.29032,-1.54776 6.5715,-1.27765 13.372694,-2.37832 19.664514,-4.82491 4.37946,-1.70316 8.86761,-3.14059 13.10968,-5.14391 3.36263,-1.58791 6.62448,-3.86107 10.10538,-5.14363 M 78.328856,60.437196 c -0.13027,1.64882 -0.83137,3.32057 -1.27464,4.91613 -1.71081,6.15882 -3.92061,12.15404 -7.92043,17.20645 -1.51143,1.90937 -3.66934,3.31429 -6.09955,3.55054 -0.79204,0.077 -1.75478,0.31408 -2.41245,-0.31873 -0.8819,-0.84831 -0.41596,-1.95771 -0.31873,-2.95869 0.195,-2.00605 0.53995,-3.80481 1.18342,-5.73548 1.62533,-4.87571 4.45019,-10.63059 8.64884,-13.83809 2.19942,-1.67995 5.45144,-2.60555 8.19354,-2.82213 z"
						/>
					</g>
				</svg>flashsoft.eu<span class="rst-s block ml-8">(andrei0x309)</span>
			</p>
		</div>
		<div class="rsd-sb">
			<p class="text-gray-600">Web Developer</p>
			<p class="text-gray-600">Software Developer</p>
		</div>

		<div class="flex pl-16">
			<ul>
				<li>
					<a
						rel="noopener noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://blog.flashsoft.eu"
						target="_blank">My Blog <i class="icon-my-blog text-custom-v" /></a
					>
				</li>
				<li>
					<a
						rel="noopener noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://gitlab.flashsoft.eu/explore/projects?sort=latest_activity_desc"
						target="_blank">GitLab <i class="icon-gitlab text-custom-v" /></a
					>
				</li>
				<li>
					<a
						rel="noopener nofollow noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://www.linkedin.com/in/andrei0x309/"
						target="_blank">Linkedin <i class="icon-linkedin text-custom-v" /></a
					>
				</li>
			</ul>

			<ul>
				<li>
					<a
						rel="noopener nofollow noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://www.goodreads.com/user/show/52338687-andrei"
						target="_blank">Goodreads <i class="icon-goodreads text-custom-v" /></a
					>
				</li>
				<li>
					<a
						rel="noopener nofollow noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://pinterest.com/andrei0x309/"
						target="_blank">Pinterest <i class="icon-pinterest-square text-custom-v" /></a
					>
				</li>
				<li>
					<a
						rel="noopener nofollow noreferrer"
						class="text-gray-600 p-2 inline-block"
						href="https://www.reddit.com/user/andrei0x309"
						target="_blank">Reddit <i class="icon-reddit text-custom-v" /></a
					>
				</li>
			</ul>
		</div>
	</nav>
	<aside class="rsb ml-8 overflow-y-scroll overflow-x-visible fixed w-[35%] h-full hidden md:block">
		<div class="nav-and-logo">
			<nav class="rsn pt-18">
				<ul class="leading-[3.2rem] text-[1.4rem]">
					<li><i class="icon-bars" /></li>
					<li>
						<a rel="section" href="#section-projects"
							><i class="icon-home" aria-hidden="true" />Projects</a
						>
					</li>
					<li>
						<a rel="section" href="#section-skills"
							><i class="icon-user-circle-o" aria-hidden="true" />Skills</a
						>
					</li>
					<li>
						<a rel="section" href="#section-tech"
							><i class="icon-server" aria-hidden="true" />Technology</a
						>
					</li>
					<li>
						<a rel="section" href="#section-interests"
							><i class="icon-tags" aria-hidden="true" />Interests</a
						>
					</li>
					<li><a rel="section" href="#section-contact"><i class="icon-envelope" />Contact</a></li>
				</ul>
			</nav>
			<figure class="rsl absolute hidden lg:block">
				<div class="box">
					<div class="computer-top">
						<div class="camera" />
						<div class="screen">
							<div class="code">
								<div class="line line01" />
								<div class="line line02" />
								<div class="line line03" />
								<div class="line line04" />
								<div class="line line05" />
								<div class="line line06" />
								<div class="line line07" />
								<div class="line line08" />
								<div class="line line09" />
								<div class="line line10" />
								<div class="line line11" />
								<div class="line line12" />
								<div class="line line13" />
								<div class="line line14" />
								<div class="line line15" />
							</div>
						</div>
					</div>
					<div class="computer-bottom">
						<div class="keyboard">
							<svg
								width="99.056175"
								height="13.977751"
								viewBox="0 0 99.056176 13.977751"
								class="keyboard"
							>
								<g transform="translate(18.398657,-68.967864)">
									<path
										style="fill:#565656;stroke-width:0.53839258"
										d="m -17.757965,82.766761 c -0.886275,-0.357438 -0.862761,-0.835215 0.131114,-2.664022 0.519417,-0.955769 1.780166,-3.346908 2.801666,-5.313648 2.748001,-5.290847 2.734922,-5.273326 4.165453,-5.58012 1.3411182,-0.287618 60.489531,-0.331969 75.461521,-0.05658 7.148185,0.131479 8.440389,0.209818 8.947548,0.542433 0.326021,0.213819 1.22345,1.554777 1.994285,2.979907 5.213207,9.638231 5.138773,9.484091 4.762432,9.862122 -0.313819,0.315229 -6.122967,0.362964 -49.03917,0.402976 -29.0565994,0.02709 -48.901555,-0.04268 -49.224849,-0.173066 z m 96.716137,-0.567098 c 0.221943,-0.267424 0.06143,-0.748302 -0.775851,-2.324327 -4.030632,-7.586928 -5.204434,-9.694854 -5.595839,-10.049071 -0.414136,-0.374787 -3.28516,-0.398224 -41.905388,-0.342082 l -41.460792,0.06027 -3.090589,6.112229 c -2.668429,5.277328 -3.04706,6.164678 -2.771923,6.496198 0.291038,0.350678 4.436936,0.38397 47.819604,0.38397 40.654749,0 47.541272,-0.0486 47.780778,-0.337187 z M -10.623385,80.4193 c -0.264509,-0.16764 -0.253033,-0.333518 0.06572,-0.949918 l 0.386192,-0.746812 h 6.5571557 c 7.1472991,0 7.285562,0.02817 6.4437113,1.312999 l -0.389296,0.594141 -6.3715056,-0.0036 c -3.5043281,-0.0019 -6.5157174,-0.09505 -6.6919774,-0.206761 z M 5.8905696,80.31323 C 5.8237768,80.139167 5.8781255,79.710061 6.0113488,79.359659 L 6.25357,78.72257 h 24.684643 24.684642 l 0.264621,0.580779 c 0.644875,1.415348 2.318696,1.326361 -24.948474,1.326361 -20.49829,0 -24.948565,-0.05623 -25.0484324,-0.31648 z M 59.152071,80.048931 c -0.606733,-1.331637 -0.564866,-1.339819 6.501058,-1.270606 l 6.476626,0.06344 0.471545,0.631778 c 0.25935,0.347481 0.398626,0.749769 0.309503,0.893972 -0.111585,0.180547 -2.237825,0.262194 -6.828078,0.262194 H 59.416692 Z M -9.3815378,77.413475 c -0.076683,-0.199835 0.035759,-0.630699 0.2498716,-0.957475 l 0.3892961,-0.594142 h 6.286402 c 6.7672668,0 6.849054,0.01593 6.2503075,1.217407 l -0.2843222,0.570538 -6.3760653,0.0635 c -5.5316378,0.05509 -6.3945303,0.01538 -6.5154897,-0.299831 z M 6.822532,77.396215 C 6.74385,77.191179 6.800218,76.758436 6.9477787,76.434563 c 0.2641556,-0.579753 0.3079507,-0.587811 2.832451,-0.52118 2.4726903,0.06526 2.5669313,0.08728 2.6420493,0.617184 0.149271,1.052972 -0.296303,1.238439 -2.9752815,1.238439 -2.0307584,0 -2.5073933,-0.0677 -2.6244655,-0.372791 z m 8.660686,0.213862 c -0.278703,-0.278702 -0.170766,-1.203224 0.173867,-1.489243 0.217797,-0.180757 1.185717,-0.252626 2.801112,-0.207985 2.372414,0.06556 2.471344,0.08956 2.546214,0.617718 0.148702,1.048958 -0.299292,1.238439 -2.928066,1.238439 -1.33881,0 -2.505718,-0.07152 -2.593127,-0.158929 z m 8.582132,0 c -0.259025,-0.259025 -0.181221,-1.153779 0.127142,-1.462141 0.389646,-0.389647 4.759634,-0.389647 5.14928,0 0.408709,0.408708 0.353402,1.305827 -0.09102,1.476369 -0.512652,0.196721 -4.986732,0.184446 -5.185406,-0.01423 z m 8.721194,0.005 c -0.433417,-0.180597 -0.371709,-1.435493 0.0791,-1.608482 0.207396,-0.07959 1.326139,-0.144701 2.486093,-0.144701 2.290402,0 2.951162,0.301143 2.81133,1.281275 -0.06798,0.476525 -0.221202,0.509328 -2.575407,0.551371 -1.376717,0.02459 -2.637218,-0.01118 -2.801113,-0.07946 z M 41.16656,77.43663 c -0.07347,-0.191455 -0.09828,-0.597273 -0.05513,-0.90182 0.07755,-0.547371 0.108524,-0.552699 2.700769,-0.464639 2.693075,0.09149 3.034515,0.220374 2.921675,1.102881 -0.05631,0.440354 -0.26623,0.481939 -2.747351,0.544233 -2.179745,0.05473 -2.711579,0.0019 -2.819965,-0.280655 z m 8.645188,0.173476 c -0.08741,-0.08741 -0.158929,-0.46288 -0.158929,-0.834374 v -0.675446 h 2.613931 c 2.402709,0 2.635354,0.04003 2.879067,0.495414 0.54256,1.013782 0.191036,1.173335 -2.585074,1.173335 -1.424536,0 -2.661586,-0.07152 -2.748995,-0.158929 z m 8.417303,-0.452571 c -0.127872,-0.336327 -0.232493,-0.711795 -0.232493,-0.834376 0,-0.132826 2.64534,-0.222873 6.547409,-0.222873 6.229246,0 6.559401,0.02241 6.794189,0.461112 0.656163,1.226058 0.752491,1.207637 -6.314917,1.207637 h -6.561696 z m -29.300287,-2.34903 c -0.161626,-0.194745 -0.256899,-0.546969 -0.211724,-0.782721 0.07235,-0.37755 0.403317,-0.43669 2.776897,-0.496191 l 2.694758,-0.06755 -0.07529,0.78273 -0.0753,0.782731 -2.407741,0.06754 c -1.899617,0.05329 -2.469756,-0.0072 -2.7016,-0.286538 z m 8.34374,0 c -0.161626,-0.194745 -0.256716,-0.546969 -0.211314,-0.782721 0.07348,-0.381571 0.370143,-0.428639 2.701603,-0.428639 h 2.619052 v 0.715178 0.715178 l -2.407741,0.06754 c -1.899617,0.05329 -2.469757,-0.0072 -2.7016,-0.286538 z m 8.383048,0.05985 c -0.16159,-0.16159 -0.2938,-0.540536 -0.2938,-0.842102 0,-0.536919 0.05137,-0.548303 2.473933,-0.548303 2.602956,0 3.142024,0.203698 2.966388,1.120912 -0.07142,0.373004 -0.391683,0.437378 -2.467401,0.495966 -1.651815,0.04662 -2.475666,-0.02302 -2.67912,-0.226473 z M 53.809636,74.5612 c -0.210998,-0.322024 -0.314418,-0.697492 -0.22982,-0.834374 0.09092,-0.147107 1.168191,-0.248876 2.634479,-0.248876 2.267774,0 2.50342,0.04252 2.745803,0.495413 0.534243,0.99824 0.17894,1.173335 -2.380917,1.173335 -2.27052,0 -2.404465,-0.02832 -2.769545,-0.585498 z m 8.372309,0.05567 c -0.766785,-1.09474 -0.630033,-1.138919 3.525423,-1.138919 3.569128,0 3.93211,0.03932 4.319979,0.467906 0.232898,0.257348 0.360168,0.632817 0.282824,0.834374 -0.118395,0.308533 -0.742674,0.366468 -3.948873,0.366468 -3.665088,0 -3.822195,-0.01992 -4.179353,-0.529829 z M -8.2765763,74.46845 c 0,-0.24191 0.199054,-0.619979 0.4423419,-0.840151 0.3848069,-0.348246 0.9813056,-0.391811 4.5860041,-0.334939 3.76950338,0.05947 4.1510967,0.10408 4.22599845,0.494015 0.19557945,1.018174 -0.25108268,1.120912 -4.87327195,1.120912 -4.0994689,0 -4.3810725,-0.02827 -4.3810725,-0.439837 z m 12.0674321,0.247732 c -0.0653,-0.105657 0.011722,-0.454306 0.1711592,-0.774775 0.2742353,-0.551212 0.4171157,-0.58638 2.6463618,-0.651368 1.2972966,-0.03782 2.459868,0.0347 2.5865086,0.161341 0.1265197,0.12652 0.1607529,0.506082 0.076073,0.843472 -0.1536361,0.612144 -0.159441,0.613435 -2.7576697,0.613435 -1.4320384,0 -2.6571333,-0.08645 -2.7224329,-0.192105 z m 8.3086532,-0.05677 c -0.0846,-0.136882 0.01881,-0.51235 0.22982,-0.834374 0.362121,-0.552668 0.508673,-0.585498 2.613677,-0.585498 2.396801,0 2.855004,0.201108 2.608231,1.14477 -0.130491,0.498999 -0.260041,0.523978 -2.717467,0.523978 -1.535611,0 -2.642727,-0.100771 -2.734261,-0.248876 z m 8.348901,0.0084 c -0.215535,-0.348744 0.08073,-1.123553 0.489616,-1.280456 0.193022,-0.07407 1.368981,-0.0678 2.613243,0.01393 l 2.262293,0.148604 v 0.679223 0.679222 h -2.608249 c -1.497103,0 -2.671577,-0.102467 -2.756903,-0.240526 z M -7.0108386,72.13437 c -0.3437185,-0.895716 0.2231495,-1.15629 2.6720207,-1.228256 2.6138141,-0.07681 3.0122739,0.09021 2.4095868,1.010025 -0.380979,0.581448 -0.4983053,0.608223 -2.665238,0.608223 -1.8786469,0 -2.2923367,-0.06677 -2.4163695,-0.389992 z m 7.86695479,0 C 0.77380662,71.919874 0.81568433,71.571225 0.94917773,71.359594 1.1471542,71.045736 1.6484976,70.97481 3.6690336,70.97481 h 2.4771405 l -0.065501,0.58556 c -0.036026,0.322058 -0.1969409,0.669065 -0.3575889,0.771126 -0.160648,0.10206 -1.287764,0.187207 -2.5047013,0.189215 -1.8307543,0.003 -2.23844091,-0.06366 -2.36226671,-0.386341 z M 8.765143,72.280549 C 8.6767399,72.13751 8.6711257,71.754664 8.752675,71.429779 8.89983,70.843469 8.9190349,70.839585 11.33784,70.906945 l 2.436897,0.06787 v 0.715178 0.715177 L 11.350306,72.4729 C 9.7862492,72.51659 8.8688342,72.44833 8.765143,72.280557 Z m 7.917852,0.0927 c -0.09171,-0.09171 -0.166744,-0.415012 -0.166744,-0.718451 0,-0.712861 0.523951,-0.839715 3.099104,-0.750326 l 2.026337,0.07034 v 0.715178 0.715177 l -2.395977,0.06741 c -1.317789,0.03708 -2.471013,-0.0076 -2.56272,-0.09933 z m 7.794982,-0.184163 c -0.0743,-0.193628 -0.09773,-0.546051 -0.05207,-0.783163 0.0738,-0.383202 0.360841,-0.431112 2.582883,-0.431112 h 2.499856 v 0.715178 0.715177 l -2.447786,0.06799 c -1.983121,0.05508 -2.473432,0.0011 -2.582883,-0.284065 z m 7.863736,-0.0084 c -0.07253,-0.189015 -0.09452,-0.537664 -0.04885,-0.774776 0.07341,-0.381186 0.355713,-0.431112 2.437705,-0.431112 1.907834,0 2.400739,0.07302 2.597394,0.384784 0.133493,0.211631 0.175371,0.56028 0.09306,0.774776 -0.124832,0.325308 -0.547528,0.389992 -2.548543,0.389992 -1.869229,0 -2.428007,-0.07588 -2.530766,-0.343664 z m 7.771636,-0.140162 c -0.489746,-0.915096 0.05674,-1.184922 2.399855,-1.184922 2.206107,0 2.960393,0.313057 2.798061,1.1613 -0.06181,0.322984 -0.482451,0.399648 -2.502254,0.456048 -2.258061,0.06305 -2.446685,0.0328 -2.695662,-0.432426 z m 7.819567,-0.129228 c -0.398745,-0.875148 0.0076,-1.047686 2.47765,-1.052044 2.197968,-0.0039 2.818141,0.261375 2.818141,1.205341 0,0.424949 -0.189894,0.459757 -2.508233,0.459757 -2.462734,0 -2.513299,-0.01112 -2.787558,-0.613054 z m 7.965788,0.326982 c -0.157339,-0.157339 -0.286071,-0.479169 -0.286071,-0.715177 0,-0.385877 0.251325,-0.429107 2.494735,-0.429107 2.259254,0 2.519068,0.04547 2.752538,0.481712 0.141793,0.264942 0.192874,0.586771 0.113515,0.715178 -0.212853,0.344403 -4.724476,0.297635 -5.074717,-0.05261 z m 7.866955,0 c -0.157339,-0.157339 -0.286071,-0.479169 -0.286071,-0.715177 0,-0.385877 0.251325,-0.429107 2.494735,-0.429107 2.222486,0 2.521664,0.05032 2.741514,0.461113 0.135729,0.253612 0.24678,0.575442 0.24678,0.715178 0,0.369127 -4.825543,0.339408 -5.196958,-0.03201 z"
										id="path4566"
									/>
								</g>
							</svg>
						</div>
					</div>
					<div class="bottom-box" />
				</div>
			</figure>
		</div>
		<div class="rst">
			<p class="text-2xl">
				andrei<svg width="142mm" height="142mm" viewBox="0 0 142 142" class="at-sign-main">
					<use href="#at-sign-path" />
				</svg>flashsoft.eu
				<span class="rst-s block ml-8">(andrei0x309)</span>
			</p>
		</div>
		<div class="rsd">
			<p>Web Developer</p>
			<p>Software Developer</p>
		</div>

		<div class="rs-slc inline-block ml-p10 mt-p10">
			<ul class="rs-links-b">
				<li class="relative">
					<a rel="noopener noreferrer" href="https://blog.flashsoft.eu" target="_blank"
						>My Blog <i class="icon-my-blog rs-slc-nonactive" /></a
					>
				</li>
				<li class="relative">
					<a
						rel="noopener noreferrer"
						href="https://gitlab.flashsoft.eu/explore/projects?sort=latest_activity_desc"
						target="_blank">GitLab <i class="icon-gitlab rs-slc-nonactive" /></a
					>
				</li>
				<li class="relative">
					<a
						rel="noopener nofollow noreferrer"
						href="https://www.linkedin.com/in/andrei0x309/"
						target="_blank">Linkedin <i class="icon-linkedin rs-slc-nonactive" /></a
					>
				</li>
			</ul>
		</div>
		<div class="rs-slc inline-block mt-p10">
			<ul class="rs-links-b">
				<li class="relative">
					<a
						rel="noopener nofollow noreferrer"
						href="https://www.goodreads.com/user/show/52338687-andrei"
						target="_blank">Goodreads <i id="islc4" class="icon-goodreads rs-slc-nonactive" /></a
					>
				</li>
				<li class="relative">
					<a
						rel="noopener nofollow noreferrer"
						href="https://pinterest.com/andrei0x309/"
						target="_blank">Pinterest <i class="icon-pinterest-square rs-slc-nonactive" /></a
					>
				</li>
				<li class="relative">
					<a
						rel="noopener nofollow noreferrer"
						href="https://github.com/andrei0x309"
						target="_blank">GitHub <i class="icon-github-original rs-slc-nonactive " /></a
					>
				</li>
			</ul>
		</div>
	</aside>
	<!--
	<a href="#0" class="cd-top">Top</a> -->
</main>
