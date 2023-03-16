<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/navbar.scss';
	import type { Locale } from 'typesafe-i18n/types/runtime/src/core.mjs';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMenu from 'svelte-icons-pack/fi/FiMenu';

	export let locale: Locale;

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
				<a href="/{locale}/about-us">{$LL.components.public.navbar.navItems.aboutUs()}</a>
			</li>
			<li class="nav-item">
				<a
					href="#how-to-participate"
					on:click|preventDefault={() => onLinkClick('#how-to-participate')}
					>{$LL.components.public.navbar.navItems.howToParticipate()}</a
				>
			</li>
			<li class="nav-item">
				<a href="/{locale}/fields">{$LL.components.public.navbar.navItems.fields()}</a>
			</li>
			<li class="nav-item">
				<a href="#footer" on:click|preventDefault={() => onLinkClick('#footer')}
					>{$LL.components.public.navbar.navItems.contact()}</a
				>
			</li>
		</ul>
	</div>
</nav>
