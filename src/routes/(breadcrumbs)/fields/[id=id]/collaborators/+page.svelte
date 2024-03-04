<script lang="ts">
	import '$scss/routes/fields/collaborators.scss'
	import type { PageData } from './$types'
	import type { CollaboratorDto } from '$types'
	import { Collaborator } from '$components'

	export let data: PageData
	$: collaborators = data.apiData as CollaboratorDto[]
</script>

<div class="collaborators">
	{#if collaborators.length > 0}
		{#each collaborators as collaborator (collaborator.id)}
			<Collaborator {collaborator} />
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma igreja em unidade.</p>
		</div>
	{/if}
</div>
