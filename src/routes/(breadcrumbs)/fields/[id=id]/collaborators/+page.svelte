<script lang="ts">
	import '$scss/routes/fields/collaborators.scss';
	import type { PageData } from './$types';
	import { Carousel } from '$components'
	import type { CollaboratorDto } from '$types';

	export let data: PageData;
	$: collaborators = data.apiData as CollaboratorDto[]
</script>

<div class="collaborators">
	{#if collaborators.length > 0}
		<Carousel>
			{#each collaborators as collaborator (collaborator.id)}
				<div class="collaborator">
					<div class="image">
						<img
							src={collaborator.image ?? 'https://via.placeholder.com/500x500.webp'}
							alt="Collaborator Logo"
						/>
					</div>
					<div class="content">
						<h3 class="title">{collaborator.title}</h3>
						<p class="text">{collaborator.description}</p>
					</div>
				</div>
			{/each}
		</Carousel>
	{/if}
</div>
