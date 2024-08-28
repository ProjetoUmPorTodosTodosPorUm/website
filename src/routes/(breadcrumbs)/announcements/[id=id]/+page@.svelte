<script lang="ts">
	import '$scss/routes/announcements.scss'
	import type { PageData } from './$types'
	import { Navbar, Breadcrumbs, Footer } from '$components'
	import type { AnnouncementDto } from '$types'
	import { friendlyDateString } from '$utils'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	export let data: PageData
	$: announcement = data.apiData as AnnouncementDto

	function placeComma(announcement: AnnouncementDto, index: number) {
		return announcement.attachments.length >= 1 && index < announcement.attachments.length - 1 ? ',' : ''
	}
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Anúncio ({announcement.title})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Anúncio ({announcement.title})" />
	<meta name="description" content="Anúncio do Projeto &quot;Um Por Todos! Todos Por Um&quot;" />
	<meta name="keywords" content="anúncio, evento, projeto">
</svelte:head>

<Navbar />
<section id="main">
	<Breadcrumbs documentId={announcement.id} />
	<h1>{announcement.title}</h1>
	<p class="sub-title no-text-indent">{friendlyDateString(announcement.createdAt)}</p>

	<div class="message-wrap">
		{@html announcement.message}
	</div>

	{#if announcement.attachments?.length > 0}
		<div class="attachments-wrap">
			Anexos
			<div class="attachment">
				{#each announcement.attachments as attachment, index}
					<a href="{PUBLIC_FILES_URL}/{attachment}" target="_blank" rel="noreferrer">
						{attachment}{placeComma(announcement, index)}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</section>
