<script lang="ts">
	import '$scss/components/announcement.scss'
	import type { AnnouncementDto } from '../types'
	import { friendlyDateString, stripHtml } from '$utils'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip'
	import FiBookmark from 'svelte-icons-pack/fi/FiBookmark'

	export let announcements: AnnouncementDto[]
	const MAX_MESSAGE_CHAR_COUNT = 300

	function placeComma(announcement: AnnouncementDto, index: number) {
		return announcement.attachments.length >= 1 && index < announcement.attachments.length - 1 ? ',' : ''
	}

	function needElipsisLink(message: string) {
		return message.length >= MAX_MESSAGE_CHAR_COUNT
	}
</script>

<div class="announcements">
	{#if announcements.length > 0}
		{#each announcements as announcement (announcement.id)}
			<div class="announcement">
				<h2 class="title">{announcement.title}</h2>
				<div class="text">
					{#if needElipsisLink(announcement.message)}
						{stripHtml(announcement.message.substring(0, MAX_MESSAGE_CHAR_COUNT))}...
						<a href="/announcements/{announcement.id}">Ler Mais.</a>
					{:else}
						{@html announcement.message}
					{/if}
				</div>
				<div class="info">
					{#if announcement.attachments?.length > 0}
						<div class="attachments pill">
							<Icon src={FiPaperclip} className="icon" title="anexo" />
							{#each announcement.attachments as attachment, index}
								<a href="{PUBLIC_FILES_URL}/{attachment}" target="_blank" rel="noreferrer"
									>{attachment}{placeComma(announcement, index)}</a
								>
							{/each}
						</div>
					{/if}
					<div class="date pill">
						{friendlyDateString(announcement.createdAt)}
						{#if announcement.fixed}
							<Icon src={FiBookmark} className="icon" title="fixado" />
						{/if}
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Não há nenhum aviso no momento.</p>
		</div>
	{/if}
</div>
