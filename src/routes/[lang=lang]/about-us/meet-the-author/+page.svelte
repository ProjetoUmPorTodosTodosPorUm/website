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
			<a href="/{data.locale}/about-us/meet-the-author"
				>{$LL.breadcrumbs.home.aboutUs.meetTheAuthor.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>{$LL.routes.aboutUs.meetTheAuthor.firstTitle()}</h1>
	<div>
		<img
			src="/images/meet-the-author/wilma-machado.png"
			class="responsive"
			alt={$LL.routes.aboutUs.meetTheAuthor.authorImageAlt()}
		/>
	</div>
	<p>
		{@html $LL.routes.aboutUs.meetTheAuthor.firstParagraph()}
	</p>

	<p>
		{@html $LL.routes.aboutUs.meetTheAuthor.secondParagraph()}
	</p>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.meetTheAuthor.firstList) as key}
			<li>{$LL.routes.aboutUs.meetTheAuthor.firstList[key]()}</li>
		{/each}
	</ul>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.meetTheAuthor.secondList) as key}
			<li>{$LL.routes.aboutUs.meetTheAuthor.secondList[key]()}</li>
		{/each}
	</ul>

	<h2>{$LL.routes.aboutUs.meetTheAuthor.secondTitle()}</h2>
	<img
		src="/images/meet-the-author/shekinah-church.jpg"
		class="responsive"
		alt={$LL.routes.aboutUs.meetTheAuthor.churchImageAlt()}
	/>

	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.meetTheAuthor.thirdList) as key}
			<li>{$LL.routes.aboutUs.meetTheAuthor.thirdList[key]()}</li>
		{/each}
	</ul>
</section>
<Footer locale={data.locale} />

<style lang="scss">
	h1,
	h2 {
		margin: 0 0 1rem;
	}

	.responsive {
		max-width: 50%;
		margin-bottom: 1rem;
	}
</style>
