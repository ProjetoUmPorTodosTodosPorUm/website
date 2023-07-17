<script lang="ts">
	import '$scss/components/announcement.scss';
	import type { AnnouncementDto } from '$lib/types';
	import { fromPaginationToQuery, getDays } from '$lib/utils/functions';
	import axios from '$lib/axios';
	import Axios from 'axios';
	import { onMount } from 'svelte';

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiPaperclip from 'svelte-icons-pack/fi/FiPaperclip';
	import BsPinAngle from 'svelte-icons-pack/bs/BsPinAngle';

	let isLoading = false;
	let announcements: AnnouncementDto[] = [];
	let currentDate = new Date();
	let maxDate = getDays(currentDate.getFullYear(), currentDate.getMonth() + 1);
	let currentYear = currentDate.getFullYear();
	let currentMonth = `${currentDate.getMonth() + 1}`.padStart(2, '0');
	let query = {
		lte: `${currentYear}-${currentMonth}-${maxDate}T23:59:59`,
		gte: `${currentYear}-${currentMonth}-01T00:00:00`
	};
	$: queryString = fromPaginationToQuery(query);

	onMount(async () => {
		await loadData();
	});

	async function loadData() {
		try {
			isLoading = true;
			announcements = (await axios.get(`/announcement/range?${queryString}`)).data.data;
			isLoading = false;
		} catch (error) {
			isLoading = false;

			if (error instanceof Axios.AxiosError) {
				console.warn(error);
			}
			console.warn(error);
		}
	}
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
