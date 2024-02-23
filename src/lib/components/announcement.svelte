<script lang="ts">
	import '$scss/components/announcement.scss';
	import type { AnnouncementDto } from '../types'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip';
	import BsPinAngle from 'svelte-icons-pack/bs/BsPinAngle';
	
	export let announcements: AnnouncementDto[]
</script>

<div class="announcements">
	{#each announcements as announcement (announcement.id)}
		<div class="announcement">
			<h2 class="title">{announcement.title}</h2>
			<p class="text">{announcement.message}</p>
			<div class="info">
				{#if announcement.attachments?.length > 0}
					<p class="attachments pill">
						<Icon src={FiPaperclip} className="icon" />
						{#each announcement.attachments as attachment}
							<a href={`/static/${attachment}`} target="_blank" rel="noreferrer">{attachment}</a>
						{/each}
					</p>
				{/if}
				<p class="date pill">
					{new Date(announcement.createdAt).toLocaleDateString()}
					{#if announcement.fixed}
						<Icon src={BsPinAngle} className="icon" />
					{/if}
				</p>
			</div>
		</div>
	{/each}
</div>
