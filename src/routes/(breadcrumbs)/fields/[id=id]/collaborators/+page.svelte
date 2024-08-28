<script lang="ts">
	import '$scss/routes/fields/collaborators.scss'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import type { CollaboratorDto, FieldDto } from '$types'
	import { Collaborator } from '$components'

	export let data: PageData
	$: field = $page.data.field as FieldDto
	$: collaborators = data.apiData as CollaboratorDto[]
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Colaboradores ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Colaboradores ({field.designation})" />
	<meta name="description" content="Colaboradores do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, colaboradores, projeto">
</svelte:head>

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
