<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/navbar.scss';
	import type { Locale } from 'typesafe-i18n/types/runtime/src/core.mjs';

	export let locale: Locale;
</script>

<nav id="main-nav">
	<div class="nav-brand">
		<a href="/{locale}">
			<img src="https://via.placeholder.com/60x100.webp" alt="Logo" />
		</a>
	</div>

	<div class="nav-toggle-icon"><a href="#icon">ICONE</a></div>

	<div class="nav-responsive">
		<ul class="nav-items">
			<li class="nav-item">
				<a href="/{locale}/about-us">{$LL.components.public.navbar.navItems.aboutUs()}</a>
			</li>
			<li class="nav-item">
				<a href="#how-to-participate">{$LL.components.public.navbar.navItems.howToParticipate()}</a>
			</li>
			<li class="nav-item">
				<a href="/{locale}/fields">{$LL.components.public.navbar.navItems.fields()}</a>
			</li>
			<li class="nav-item">
				<a href="#footer">{$LL.components.public.navbar.navItems.contact()}</a>
			</li>
			<li class="nav-item">
				<a href="#filter">{$LL.components.public.navbar.navItems.filter()}</a>
			</li>
		</ul>
	</div>
</nav>
