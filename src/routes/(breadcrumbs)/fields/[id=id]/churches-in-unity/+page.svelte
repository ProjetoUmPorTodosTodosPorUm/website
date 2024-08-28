<script lang="ts">
	import '$scss/routes/fields/churches-in-unity.scss'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import type { ChurchDto, FieldDto } from '$types'
	import { Church } from '$components'
	import { ChurchType } from '$enums'
	import { CHURCH_TYPES } from '$constants'

	export let data: PageData
	$: field = $page.data.field as FieldDto
	$: churches = data.apiData as ChurchDto[]
	$: mainChurch = churches.filter((church) =>
		[ChurchType.PIONEER, ChurchType.EXPANSION, ChurchType.RESPONSIBLE].includes(church.type)
	)[0]
	$: churchTypes = [
		{ value: 'PIONEER', text: CHURCH_TYPES.pioneer },
		{ value: 'EXPANSION', text: CHURCH_TYPES.expansion },
		{ value: 'SUPPORT', text: CHURCH_TYPES.support },
		{ value: 'RESPONSIBLE', text: CHURCH_TYPES.responsible }
	]
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Igrejas em Unidade ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Igrejas em Unidade ({field.designation})" />
	<meta name="description" content="Igrejas em unidade do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, igrejas em unidade, sede, apoio, projeto">
</svelte:head>

<div class="churches">
	{#if churches.length > 0}
		<!-- Main Church -->
		<h4>Igreja {churchTypes.filter((churchType) => churchType.value == mainChurch.type)[0].text}</h4>
		<Church church={mainChurch} />

		{#if churches.length > 1}
			<h4>Igrejas de Apoio</h4>
		{/if}
		{#each churches as church (church.id)}
			{#if ![ChurchType.PIONEER, ChurchType.EXPANSION, ChurchType.RESPONSIBLE].includes(church.type)}
				<Church {church} />
			{/if}
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma igreja em unidade.</p>
		</div>
	{/if}
</div>
