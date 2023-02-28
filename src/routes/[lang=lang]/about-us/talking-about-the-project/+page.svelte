<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';

	export let data: PageData;

	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'components');
		await loadNamespaceAsync(data.locale, 'routes');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li><a href="/{data.locale}/about-us">{$LL.breadcrumbs.home.aboutUs.text()}</a></li>
		<li>
			<a href="/{data.locale}/about-us/talking-about-the-project"
				>{$LL.breadcrumbs.home.aboutUs.talkingAbout.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>{$LL.routes.aboutUs.talkingAbout.firstSection.title()}</h1>

	<p>{@html $LL.routes.aboutUs.talkingAbout.firstSection.firstParagraph()}</p>
	<p>{@html $LL.routes.aboutUs.talkingAbout.firstSection.secondtParagraph()}</p>
	<p>{@html $LL.routes.aboutUs.talkingAbout.firstSection.thirdParagraph()}</p>

	<h2>{$LL.routes.aboutUs.talkingAbout.secondSection.title()}</h2>
	<p>{@html $LL.routes.aboutUs.talkingAbout.secondSection.firstParagraph()}</p>
	<p>{@html $LL.routes.aboutUs.talkingAbout.secondSection.secondtParagraph()}</p>

	<table class="table table-striped">
		<caption>{$LL.routes.aboutUs.talkingAbout.secondSection.table.caption()}</caption>
		<thead>
			<tr>
				{#each Object.keys($LL.routes.aboutUs.talkingAbout.secondSection.table.columns) as key}
					<th>{$LL.routes.aboutUs.talkingAbout.secondSection.table.columns[key]()}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each Object.keys($LL.routes.aboutUs.talkingAbout.secondSection.table.rows) as row}
				<tr>
					{#each Object.keys($LL.routes.aboutUs.talkingAbout.secondSection.table.rows[row]) as rowKey}
						<td>{$LL.routes.aboutUs.talkingAbout.secondSection.table.rows[row][rowKey]()}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<p>{@html $LL.routes.aboutUs.talkingAbout.secondSection.thirdParagraph()}</p>

	<h2>{$LL.routes.aboutUs.talkingAbout.thirdSection.title()}</h2>
	<ul class="simple-ulist">
		{#each Object.keys($LL.routes.aboutUs.talkingAbout.thirdSection.list) as key}
			<li>{@html $LL.routes.aboutUs.talkingAbout.thirdSection.list[key]()}</li>
		{/each}
	</ul>
	<img class="responsive" src="/images/project-info.png" width="847" alt="cabeçalho" />
	<p class="img-description">
		{@html $LL.routes.aboutUs.talkingAbout.thirdSection.firstParagraph()}
	</p>
	<p>{@html $LL.routes.aboutUs.talkingAbout.thirdSection.secondParagraph()}</p>
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	h1,
	h2,
	h3 {
		margin: 0 0 1rem;
	}

	.responsive {
		max-width: 50%;
	}
</style>
