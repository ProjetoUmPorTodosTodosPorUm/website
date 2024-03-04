<script lang="ts">
    import '$scss/components/church.scss'
	import type { ChurchDto } from '../types'
    import { PUBLIC_FILES_URL, PUBLIC_ASSETS_URL } from '$env/static/public'

	export let church: ChurchDto
</script>

<svelte:head>
	<link rel="stylesheet" href="{PUBLIC_ASSETS_URL}/fresco/css/fresco.css" />
	<script type="text/javascript" src="{PUBLIC_ASSETS_URL}/fresco/js/jquery-3.7.1.min.js" defer></script>
	<script type="text/javascript" src="{PUBLIC_ASSETS_URL}/fresco/js/fresco.min.js" defer></script>
</svelte:head>

<div class="church">
	<div class="image">
		{#if church.images.length > 1}
			<a
				href="{PUBLIC_FILES_URL}/{church.images[0]}"
				class="fresco"
				data-fresco-group={church.id}
				data-fresco-caption={church.name}
				data-fresco-group-options="loop:true"
			>
				<img src="{PUBLIC_FILES_URL}/{church.images[0]}" alt="Igreja Em Unidade" />
			</a>
			{#each church.images as image, index}
				{#if index > 0}
					<a
						href="{PUBLIC_FILES_URL}/{image}"
						class="fresco hidden"
						data-fresco-group={church.id}
						data-fresco-caption={church.name}
						data-fresco-group-options="loop:true"
					>
						<img src="{PUBLIC_FILES_URL}/{image}" alt="Igreja Em Unidade" />
					</a>
				{/if}
			{/each}
		{:else}
			<img
				src={church.images[0]
					? `${PUBLIC_FILES_URL}/${church.images[0]}`
					: 'https://placehold.co/160x90?text=Igreja+em+Unidade'}
				alt="Igreja Em Unidade"
			/>
		{/if}
	</div>
	<div class="content">
		<h5 class="title">{church.name}</h5>
		<div class="text">{@html church.description}</div>
	</div>
</div>
