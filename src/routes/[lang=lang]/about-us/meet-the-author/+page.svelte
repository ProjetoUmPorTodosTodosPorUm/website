<script lang="ts">
	import '$lib/scss/routes/about-us/meet-the-author.scss';
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['about-us'];

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'about-us');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} />

	<h1>{i18n.meetTheAuthor.firstTitle()}</h1>
	<div>
		<img
			src="/images/meet-the-author/wilma-machado.png"
			class="responsive"
			alt={i18n.meetTheAuthor.authorImageAlt()}
		/>
	</div>
	<p>
		{@html i18n.meetTheAuthor.firstParagraph()}
	</p>

	<p>
		{@html i18n.meetTheAuthor.secondParagraph()}
	</p>

	<ul class="simple-ulist">
		{#each Object.keys(i18n.meetTheAuthor.firstList) as key}
			<li>{i18n.meetTheAuthor.firstList[key]()}</li>
		{/each}
	</ul>

	<ul class="simple-ulist">
		{#each Object.keys(i18n.meetTheAuthor.secondList) as key}
			<li>{i18n.meetTheAuthor.secondList[key]()}</li>
		{/each}
	</ul>

	<h2>{i18n.meetTheAuthor.secondTitle()}</h2>
	<img
		src="/images/meet-the-author/shekinah-church.jpg"
		class="responsive"
		alt={i18n.meetTheAuthor.churchImageAlt()}
	/>

	<ul class="simple-ulist">
		{#each Object.keys(i18n.meetTheAuthor.thirdList) as key}
			<li>{i18n.meetTheAuthor.thirdList[key]()}</li>
		{/each}
	</ul>
</section>
<Footer locale={data.locale} />
