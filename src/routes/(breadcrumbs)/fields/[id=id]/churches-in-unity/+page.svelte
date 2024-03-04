<script lang="ts">
	import '$scss/routes/fields/churches-in-unity.scss'
	import type { PageData } from './$types'
	import type { ChurchDto } from '$types'
	import { Church } from '$components'
	import { ChurchType } from '$enums'
	import { CHURCH_TYPES } from '$constants'

	export let data: PageData
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
