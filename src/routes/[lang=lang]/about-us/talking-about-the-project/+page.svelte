<script lang="ts">
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

	<h1>{i18n.talkingAboutTheProject.firstSection.title()}</h1>

	<p>{@html i18n.talkingAboutTheProject.firstSection.firstParagraph()}</p>
	<p>{@html i18n.talkingAboutTheProject.firstSection.secondtParagraph()}</p>
	<p>{@html i18n.talkingAboutTheProject.firstSection.thirdParagraph()}</p>

	<h2>{i18n.talkingAboutTheProject.secondSection.title()}</h2>
	<p>{@html i18n.talkingAboutTheProject.secondSection.firstParagraph()}</p>
	<p>{@html i18n.talkingAboutTheProject.secondSection.secondtParagraph()}</p>

	<table class="table table-striped">
		<caption>{i18n.talkingAboutTheProject.secondSection.table.caption()}</caption>
		<thead>
			<tr>
				{#each Object.keys(i18n.talkingAboutTheProject.secondSection.table.columns) as key}
					<th>{i18n.talkingAboutTheProject.secondSection.table.columns[key]()}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Object.keys(i18n.talkingAboutTheProject.secondSection.table.rows) as row}
				<tr>
					{#each Object.keys(i18n.talkingAboutTheProject.secondSection.table.rows[row]) as rowKey}
						<td>{i18n.talkingAboutTheProject.secondSection.table.rows[row][rowKey]()}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<p>{@html i18n.talkingAboutTheProject.secondSection.thirdParagraph()}</p>

	<h2>{i18n.talkingAboutTheProject.thirdSection.title()}</h2>
	<ul class="simple-ulist">
		{#each Object.keys(i18n.talkingAboutTheProject.thirdSection.list) as key}
			<li>{@html i18n.talkingAboutTheProject.thirdSection.list[key]()}</li>
		{/each}
	</ul>
	<img class="responsive" src="/images/project-info.png" width="847" alt="cabeçalho" />
	<p class="img-description">
		{@html i18n.talkingAboutTheProject.thirdSection.firstParagraph()}
	</p>
	<p>{@html i18n.talkingAboutTheProject.thirdSection.secondParagraph()}</p>
</section>
<Footer locale={data.locale} />
