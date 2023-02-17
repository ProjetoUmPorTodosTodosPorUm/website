<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li><a href="/{data.locale}/about-us">{$LL.breadcrumbs.home.aboutUs.text()}</a></li>
		<li>
			<a href="/{data.locale}/about-us/services">{$LL.breadcrumbs.home.aboutUs.services.text()}</a>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>{$LL.routes.aboutUs.services.firstSection.mainTitle()}</h1>

	<h2>{$LL.routes.aboutUs.services.firstSection.title()}</h2>
	<p class="sub-title">{$LL.routes.aboutUs.services.firstSection.subTitle()}</p>
	<p>{@html $LL.routes.aboutUs.services.firstSection.paragraph()}</p>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.services.firstSection.firstList) as key}
			<li>{@html $LL.routes.aboutUs.services.firstSection.firstList[key]()}</li>
		{/each}
	</ul>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.services.firstSection.secondList) as key}
			<li>{@html $LL.routes.aboutUs.services.firstSection.secondList[key]()}</li>
		{/each}
	</ul>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.services.firstSection.thirdList) as key}
			<li>{@html $LL.routes.aboutUs.services.firstSection.thirdList[key]()}</li>
		{/each}
	</ul>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.services.firstSection.fourthList) as key}
			<li>{@html $LL.routes.aboutUs.services.firstSection.fourthList[key]()}</li>
		{/each}
	</ul>

	<h3>{$LL.routes.aboutUs.services.secondSection.firstTitle()}</h3>
	<p>{@html $LL.routes.aboutUs.services.secondSection.firstParagraph()}</p>

	<h3>{$LL.routes.aboutUs.services.secondSection.secondTitle()}</h3>
	<p>{@html $LL.routes.aboutUs.services.secondSection.secondParagraph()}</p>
</section>
<Footer locale={data.locale} />

<style lang="scss">
	h1,
	h2,
	h3 {
		margin: 0 0 1rem;
	}

	h3:first-of-type {
		margin-top: 2rem;
	}

	.sub-title {
		padding: 0;
		font-size: 0.8rem;
		margin-top: -1rem;
	}
</style>
