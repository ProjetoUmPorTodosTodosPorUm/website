<script lang="ts">
	import '$scss/components/footer.scss';
	import * as yup from 'yup';
	import axios from '$lib/axios';
	import { default as Axios } from 'axios';
	import { delay } from '$lib/utils/functions';
	import SwitchLocale from './switch-locale.svelte';
	import type { Namespaces } from '$i18n/i18n-types';
	import { createEventDispatcher, type ComponentEvents, onMount } from 'svelte';

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FaWindowClose from 'svelte-icons-pack/fa/FaWindowClose';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';
	import { afterNavigate } from '$app/navigation';
	import type { Navigation } from '@sveltejs/kit';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['footer'];

	const dispatch = createEventDispatcher();

	// Component Data
	export let locale: Locales;
	export let namespaces: Namespaces[] = [];

	let activePage: string = '';

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

	onMount(async () => {
		await loadNamespaceAsync(locale, 'footer');
		setLocale(locale);
	});

	afterNavigate(async (navigation: Navigation) => {
		const routeId = navigation.to?.route.id;
		if (routeId) {
			activePage = routeId;
		}
	});

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
							message: i18n.contact.success()
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

	function namespacesByActivePage(activePage: string) {
		let defaultNamespaces = [
			...namespaces,
			'navbar',
			'breadcrumbs',
			'footer',
			'utils'
		] as Namespaces[];

		if (activePage) {
			defaultNamespaces.push(activePage as Namespaces);
		}

		return defaultNamespaces;
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
				<a href="/{locale}/about-us">{i18n.navigation.aboutUs.title()}</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/meet-the-author"
							>{i18n.navigation.aboutUs.meetTheAuthor()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/talking-about-the-project"
							>{i18n.navigation.aboutUs.talkingAbout()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/about-us/services">{i18n.navigation.aboutUs.services()}</a>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/{locale}/how-to-participate">{i18n.navigation.howToParticipate.title()}</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-family"
							>{i18n.navigation.howToParticipate.asFamily()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-church"
							>{i18n.navigation.howToParticipate.asChurch()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/how-to-participate/as-secular-institution"
							>{i18n.navigation.howToParticipate.asInstitution()}</a
						>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/{locale}/fields">{i18n.navigation.fields.title()}</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/{locale}/fields/collaborators">{i18n.navigation.fields.collaborators()}</a>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/welcomed-families"
							>{i18n.navigation.fields.welcomedFamilies()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/offeror-families"
							>{i18n.navigation.fields.offerorFamilies()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/churches-in-unity"
							>{i18n.navigation.fields.churchesInUnity()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/collected-offers"
							>{i18n.navigation.fields.collectedOffers()}</a
						>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/reports">{i18n.navigation.fields.reports()}</a>
					</li>
					<li class="nav-sub-item">
						<a href="/{locale}/fields/volunteers">{i18n.navigation.fields.volunteers()}</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div class="contact">
		<h3>{i18n.contact.title()}</h3>
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
				placeholder={i18n.contact.nameInput()}
				required
				autoComplete="off"
			/>
			<input
				bind:this={emailRef}
				bind:value={email}
				type="email"
				name="email"
				placeholder={i18n.contact.emailInput()}
				required
				autoComplete="off"
			/>
			<textarea
				bind:this={textRef}
				bind:value={message}
				placeholder={i18n.contact.messageInput()}
				name="message"
				required
				autoComplete="off"
				minlength="20"
			/>
			<button bind:this={submitRef} disabled={!isSendButtonEnabled} type="submit">
				{#if isSending}
					<Icon src={AiOutlineLoading} className="icon" />
				{:else}
					{i18n.contact.sendButton()}
				{/if}
			</button>
		</form>
	</div>
	<div class="info">
		<SwitchLocale
			namespaces={namespacesByActivePage(activePage.split('/')[2] || '')}
			on:switchLocale={onSwitchLocale}
		/>
		<div class="text">© 2023 {i18n.info.project()}.</div>
	</div>
</section>
