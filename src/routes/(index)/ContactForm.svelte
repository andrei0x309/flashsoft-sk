<script lang="ts">
	import AlertEmail from './AlertEmail.svelte';
	import { onMount } from 'svelte';
	import Lazy from '@/components/Lazy.svelte';
	import { browser } from '$app/environment';

	let email: string = '';
	let name: string = '';
	let message: string = '';
	let mailForm: HTMLElement;
	let spinner: HTMLElement;
	let hcaptchaElement: HTMLElement;

	let showAlert: boolean = false;
	let alertMsg: string = '';
	let alertType: string = 'error';

	const showAlertElement = (msg: string, type: string) => {
		showAlert = true;
		alertMsg = msg;
		alertType = type;
	};

	const setLoadEmail = (isSending = true) => {
		if (isSending) {
			if (mailForm) {
				mailForm.style.display = 'none';
			}
			if (spinner) {
				spinner.style.display = 'inline-block';
			}
		} else {
			if (mailForm) {
				mailForm.style.display = 'block';
			}
			if (spinner) {
				spinner.style.display = 'none';
			}
		}
	};

	const submitEmail = async () => {
		const hCaptcha = (document?.querySelector('form div iframe') as HTMLElement)?.dataset
			?.hcaptchaResponse;

		setLoadEmail(true);
		const data = {
			email,
			name,
			message,
			hCaptcha
		};
		setLoadEmail(false);
		const recentEmail = localStorage.getItem('recent-email');
		if (recentEmail) {
			const num = isNaN(parseInt(recentEmail)) ? 0 : parseInt(recentEmail);
			const date = new Date(num);
			const now = new Date();
			if (date.getTime() + 6e5 > now.getTime()) {
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
		setLoadEmail(false);
		if (response.ok) {
			showAlertElement('Email sent!', 'success');
			localStorage.setItem('recent-email', new Date().getTime().toString());
		} else {
			await response.json().then((data: any) => {
				showAlertElement(`Error: ${data?.error}`, 'error');
			});
		}
	};

	const renderCaptcha = () => {
		if (hcaptchaElement && (window as unknown as { hcaptcha: unknown })?.hcaptcha) {
			(
				window as unknown as {
					hcaptcha: {
						render: (
							el: HTMLElement,
							op: {
								sitekey: string;
								theme: string;
							}
						) => void;
					};
				}
			).hcaptcha.render(hcaptchaElement, {
				sitekey: 'c529949f-b6e7-4e97-af3a-0ddb0f7c1c5a',
				theme: 'dark'
			});
		}
	};

	onMount(() => {
		renderCaptcha();
	});
</script>

<section id="section-contact">
	<div class="ls-h mb-0">
		<h2 class="my-3">Contact form</h2>
	</div>
	<div id="ls-ct-fr" class="ls-ct-fr">
		<div bind:this={spinner} id="spinner" class="spinner spinner__1" />
		<AlertEmail bind:showAlert bind:msg={alertMsg} bind:type={alertType} />
		{#if browser}
			<Lazy>
				<form bind:this={mailForm} id="mail-form">
					<input bind:value={name} id="form-name" name="name" type="text" placeholder="Name" />
					<input bind:value={email} id="form-email" name="email" type="email" placeholder="Email" />
					<textarea
						bind:value={message}
						id="form-message"
						name="message"
						cols="30"
						rows="5"
						placeholder="Message"
					/>

					<div bind:this={hcaptchaElement} class="flex justify-center" />
					<script
						src="https://js.hcaptcha.com/1/api.js?render=explicit"
						on:load={renderCaptcha}
						async
						defer
					></script>
					<button
						on:click|preventDefault={submitEmail}
						id="form-submit"
						type="submit"
						value="Send"
						class="btn-submit"><i class="icon-paper-plane-o" />&nbsp;Send&nbsp;</button
					>
				</form>
			</Lazy>
		{:else}
			<form bind:this={mailForm} id="mail-form">
				<input bind:value={name} id="form-name" name="name" type="text" placeholder="Name" />
				<input bind:value={email} id="form-email" name="email" type="email" placeholder="Email" />
				<textarea
					bind:value={message}
					id="form-message"
					name="message"
					cols="30"
					rows="5"
					placeholder="Message"
				/>

				<button
					on:click|preventDefault={submitEmail}
					id="form-submit"
					type="submit"
					value="Send"
					class="btn-submit"><i class="icon-paper-plane-o" />&nbsp;Send&nbsp;</button
				>
			</form>
		{/if}
	</div>
</section>
