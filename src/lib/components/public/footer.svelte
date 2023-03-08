<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/footer.scss';
	import * as yup from 'yup';
	import axios from '$lib/axios';
	import { default as Axios } from 'axios';
	import { delay } from '$lib/utils/functions';
	import type { Locale } from 'typesafe-i18n/types/runtime/src/core.mjs';
	import SwitchLocale from './switch-locale.svelte';
	import type { Namespaces } from '$i18n/i18n-types';
	import { createEventDispatcher, type ComponentEvents } from 'svelte';

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaWindowClose from 'svelte-icons-pack/fa/FaWindowClose';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';

	const dispatch = createEventDispatcher();

	// Foward Data
	export let namespaces: Namespaces[] = [];

	// Component Data
	export let locale: Locale;

	const schema = yup.object().shape({
		name: yup.string().required(),
		email: yup.string().required().email(),
		message: yup.string().required().min(20)
	});

	let name = '';
	let email = '';
	let message = '';
	let formMessages: any[] = [];
	$: isSendButtonEnabled = Boolean(name) && Boolean(email) && Boolean(message);
	let isSending = false;

	let formResponseRef: HTMLParagraphElement;
	let formRef: HTMLFormElement;
	let nameRef: HTMLInputElement;
	let emailRef: HTMLInputElement;
	let textRef: HTMLTextAreaElement;
	let submitRef: HTMLButtonElement;

	async function onSubmit(event: Event) {
		blockForm();

		try {
			const isValid = schema.validateSync({ name, email, message }, { abortEarly: false });
			if (isValid) {
				const res = await axios.post('/contact', { name, email, message });
				if (res.status == 201) {
					formMessages = [
						{
							id: Date.now(),
							message: $LL.components.public.footer.contact.success()
						}
					];
					showSuccessMessage();
					clearForm();
					await delay(3 * 1000);
					clearMessage();
				}
			}
		} catch (error) {
			if (Axios.isAxiosError(error)) {
				formMessages = [
					{
						id: Date.now(),
						message: error.response?.data.message
					}
				];
			} else if (error instanceof yup.ValidationError) {
				for (const err of error.inner) {
					formMessages = [
						...formMessages,
						{
							id: Date.now(),
							message: error.message
						}
					];
				}
			}
			showFailMessage();
		}

		unblockForm();
	}

	function blockForm() {
		// Form doesn't accept :disabled pseud-class
		formRef.style.cursor = 'not-allowed';
		formRef.style.opacity = '0.5';
		nameRef.setAttribute('disabled', '');
		emailRef.setAttribute('disabled', '');
		textRef.setAttribute('disabled', '');
		submitRef.setAttribute('disabled', '');
		isSending = true;
	}

	function unblockForm() {
		formRef.style.cursor = 'initial';
		formRef.style.opacity = 'initial';
		nameRef.removeAttribute('disabled');
		emailRef.removeAttribute('disabled');
		textRef.removeAttribute('disabled');
		submitRef.removeAttribute('disabled');
		isSending = false;
	}

	function showSuccessMessage() {
		isSending = false;
		formResponseRef.innerText = `${formMessages.map((fm) => fm.message).join(', ')}`;
		formResponseRef.parentElement?.classList.remove('fail');
		formResponseRef.parentElement?.classList.add('success', 'show');
	}

	function showFailMessage() {
		formResponseRef.innerText = `${formMessages.map((fm) => fm.message).join(', ')}`;
		formResponseRef.parentElement?.classList.remove('success');
		formResponseRef.parentElement?.classList.add('fail', 'show');
	}

	function clearForm() {
		name = '';
		email = '';
		message = '';
		unblockForm();
	}

	function clearMessage() {
		formMessages = [];
	}

	function handleCloseMessage() {
		formResponseRef.parentElement?.classList.remove('show');
		setTimeout(() => {
			formResponseRef.parentElement?.classList.remove('success', 'fail');
			formMessages = [];
		}, 700); // See transition time, +100ms
	}

	// Forward Event
	function onSwitchLocale(event: ComponentEvents<SwitchLocale>['switchLocale']) {
		dispatch('switchLocale', {
			newLocale: event.detail.newLocale
		});
	}
</script>

<section id="footer">
	<nav class="navigation">
		<ul class="nav-items">
			<li class="nav-item">
				<a href="/{locale}/about-us">{$LL.components.public.footer.navigation.aboutUs.title()}</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/meet-the-author"
							>{$LL.components.public.footer.navigation.aboutUs.meetTheAuthor()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/talking-about-the-project"
							>{$LL.components.public.footer.navigation.aboutUs.talkingAbout()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/services"
							>{$LL.components.public.footer.navigation.aboutUs.services()}</a
						>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/{locale}/how-to-participate"
					>{$LL.components.public.footer.navigation.howToParticipate.title()}</a
				>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-family"
							>{$LL.components.public.footer.navigation.howToParticipate.asFamily()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-church"
							>{$LL.components.public.footer.navigation.howToParticipate.asChurch()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-secular-institution"
							>{$LL.components.public.footer.navigation.howToParticipate.asInstitution()}</a
						>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/{locale}/fields">{$LL.components.public.footer.navigation.fields.title()}</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/fields/collaborators"
							>{$LL.components.public.footer.navigation.fields.collaborators()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/welcomed-families"
							>{$LL.components.public.footer.navigation.fields.welcomedFamilies()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/offeror-families"
							>{$LL.components.public.footer.navigation.fields.offerorFamilies()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/churches-in-unity"
							>{$LL.components.public.footer.navigation.fields.churchesInUnity()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/collected-offers"
							>{$LL.components.public.footer.navigation.fields.collectedOffers()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/reports"
							>{$LL.components.public.footer.navigation.fields.reports()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/volunteers"
							>{$LL.components.public.footer.navigation.fields.volunteers()}</a
						>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div class="contact">
		<h1>{$LL.components.public.footer.contact.title()}</h1>
		<form bind:this={formRef} on:submit|preventDefault|stopPropagation={onSubmit}>
			<div class="res-container">
				<p bind:this={formResponseRef} />
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="" on:click|preventDefault={handleCloseMessage} rel="external"
					><Icon src={FaWindowClose} /></a
				>
			</div>
			<input
				bind:this={nameRef}
				bind:value={name}
				type="text"
				name="name"
				placeholder={$LL.components.public.footer.contact.nameInput()}
				required
				autoComplete="off"
			/>
			<input
				bind:this={emailRef}
				bind:value={email}
				type="email"
				name="email"
				placeholder={$LL.components.public.footer.contact.emailInput()}
				required
				autoComplete="off"
			/>
			<textarea
				bind:this={textRef}
				bind:value={message}
				placeholder={$LL.components.public.footer.contact.messageInput()}
				name="message"
				required
				autoComplete="off"
				minlength="20"
			/>
			<button bind:this={submitRef} disabled={!isSendButtonEnabled} type="submit">
				{#if isSending}
					<Icon src={AiOutlineLoading} className="icon" />
				{:else}
					{$LL.components.public.footer.contact.sendButton()}
				{/if}
			</button>
		</form>
	</div>
	<div class="info">
		<SwitchLocale {namespaces} on:switchLocale={onSwitchLocale} />
		<div class="text">© 2023 {$LL.components.public.footer.info.project()}.</div>
	</div>
</section>
