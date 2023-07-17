<script lang="ts">
	import '$scss/components/navbar.scss';
	import { onMount } from 'svelte';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMenu from 'svelte-icons-pack/fi/FiMenu';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL.navbar;

	export let locale: Locales;

	let navRef: HTMLElement;
	let navToggleIconRef: HTMLDivElement;
	let navResponsiveRef: HTMLDivElement;

	function onNavToggle() {
		navResponsiveRef.classList.toggle('open');
		navToggleIconRef.classList.toggle('open');
		navRef.classList.toggle('open');
	}

	function onLinkClick(sectionId: string) {
		const animationTime = 300; // ms
		navResponsiveRef.classList.remove('open');

		setTimeout(() => {
			const navbarHeight = navRef.offsetHeight;
			const sectionRef: HTMLDivElement | null = document.querySelector(sectionId);

			if (sectionRef) {
				window.scrollTo({ top: sectionRef.offsetTop - navbarHeight, behavior: 'smooth' });
			}
		}, animationTime);
	}

	onMount(async () => {
		await loadNamespaceAsync(locale, 'navbar');
		setLocale(locale);
	});
</script>

<nav bind:this={navRef} id="main-nav">
	<div class="nav-brand">
		<a href="/{locale}" on:click|preventDefault={() => onLinkClick('#landing')}>
			<img src="/images/logo.png" alt="Logo" />
		</a>
	</div>

	<div bind:this={navToggleIconRef} class="nav-toggle-icon">
		<a href="#icon" on:click={onNavToggle}><Icon src={FiMenu} /></a>
	</div>

	<div bind:this={navResponsiveRef} class="nav-responsive">
		<ul class="nav-items">
			<li class="nav-item">
				<a href="/{locale}/about-us">{i18n.aboutUs()}</a>
			</li>
			<li class="nav-item">
				<a
					href="#how-to-participate"
					on:click|preventDefault={() => onLinkClick('#how-to-participate')}
					>{i18n.howToParticipate()}</a
				>
			</li>
			<li class="nav-item">
				<a href="/{locale}/fields">{i18n.fields()}</a>
			</li>
			<li class="nav-item">
				<a href="#agenda-announcement" on:click|preventDefault={() => onLinkClick('#agenda-announcement')}
					>{i18n.announcements()}</a
				>
			</li>
			<li class="nav-item">
				<a href="#footer" on:click|preventDefault={() => onLinkClick('#footer')}>{i18n.contact()}</a
				>
			</li>
		</ul>
	</div>
</nav>
