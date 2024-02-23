<script lang="ts">
	import '$scss/routes/fields/churches-in-unity.scss';
	import type { PageData } from './$types';
	import { Carousel } from '$components'
	import type { ChurchDto } from '$types';

	export let data: PageData;
	$: churches = data.apiData as ChurchDto[]
</script>

<div class="churches">
	{#if churches.length > 0}
		<Carousel>
			{#each churches as church (church.id)}
				<div class="church">
					<div class="image">
						<img
							src={church.images[0] ?? 'https://via.placeholder.com/500x500.webp'}
							alt="Collaborator Logo"
						/>
					</div>
					<div class="content">
						<h3 class="title">{church.name}</h3>
						<p class="text">{church.description}</p>
					</div>
				</div>
			{/each}
		</Carousel>
	{/if}
</div>

