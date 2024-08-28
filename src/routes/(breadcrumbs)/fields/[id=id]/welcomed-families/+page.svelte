<script lang="ts">
	import '$scss/routes/fields/welcomed-families.scss'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import type { WelcomedFamilyDto, FieldDto } from '$types'
	import { WelcomedFamiliesVisualizer } from '$components'

	export let data: PageData
	$: field = $page.data.field as FieldDto
	$: welcomedFamilies = data.apiData as WelcomedFamilyDto[]
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Famílias Acolhidas ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Famílias Acolhidas ({field.designation})" />
	<meta name="description" content="Famílias acolhidas do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, famílias acolhidas, representantes, projeto">
</svelte:head>

<!-- <WelcomedFamiliesVisualizer /> -->

<div class="welcomed-families centered">
	{#if welcomedFamilies.length > 0}
		{#each welcomedFamilies as welcomedFamily (welcomedFamily.id)}
			<div class="welcomed-family">
				<div class="family">{welcomedFamily.familyName}</div>
				<div class="family-sub">Família representada por {welcomedFamily.representative}</div>
			</div>
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma família acolhida.</p>
		</div>
	{/if}
</div>
