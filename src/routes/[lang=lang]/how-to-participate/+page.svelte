<script lang="ts">
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Breadcrumbs from '$lib/components/breadcrumbs.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['how-to-participate'];

	export let data: PageData;

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'how-to-participate');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<Breadcrumbs locale={data.locale} />

	<h1>{i18n.title()}</h1>

	<h2>{i18n.firstSection.title()}</h2>
	<p>{@html i18n.firstSection.firstParagraph({ locale: data.locale })}</p>
	<p>{@html i18n.firstSection.secondParagraph({ locale: data.locale })}</p>
	<p>{@html i18n.firstSection.observation()}</p>

	<h2>{i18n.secondSection.title()}</h2>
	<p>{@html i18n.secondSection.firstParagraph({ locale: data.locale })}</p>

	<h2>{i18n.thirdSection.title()}</h2>
	<ul class="simple-ulist">
		{#each Object.keys(i18n.thirdSection.offerCriteria) as key}
			<li>{i18n.thirdSection.offerCriteria[key]()}</li>
		{/each}
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.community.subTitle()}</li>
		<li>{i18n.thirdSection.community.text()}</li>
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.church.subTitle()}</li>
		<li>{i18n.thirdSection.church.text()}</li>
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.external.subTitle()}</li>
		<li>{i18n.thirdSection.external.text()}</li>
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.offerReceipt.subTitle()}</li>
		<li>{i18n.thirdSection.offerReceipt.text()}</li>
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.extraOffers.subTitle()}</li>
		<li>{i18n.thirdSection.extraOffers.text()}</li>
	</ul>
	<ul class="simple-ulist">
		<li>{i18n.thirdSection.observation.subTitle()}</li>
		<li>{i18n.thirdSection.observation.text()}</li>
	</ul>
	<p><cite>{i18n.thirdSection.footnote()}</cite></p>

	<h2 id="we-need">{i18n.fourthSection.title()}</h2>
	<ul class="simple-ulist">
		<li>{i18n.fourthSection.disciplers.subTitle()}</li>
		<li>{i18n.fourthSection.disciplers.text()}</li>
	</ul>

	<ul class="simple-ulist">
		<li>{@html i18n.fourthSection.bibles.subTitle()}</li>
		<li>{i18n.fourthSection.bibles.text()}</li>
	</ul>

	<p>{i18n.fourthSection.note()}</p>

	<!-- @TODO Colocar Component para enviar e-mail para participar do projeto -->
	<h2 id="contact">Deseja participar? Envie-nos um e-mail!</h2>
	<!-- participate component-->
</section>
<Footer locale={data.locale} />
