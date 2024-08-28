<script lang="ts">
	import '$scss/routes/fields/recovery-houses.scss'
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import type { RecoveryHouseDto, FieldDto } from '$types'
	import { RecoveryHouse } from '$components'

	export let data: PageData
	$: field = $page.data.field as FieldDto
	$: recoveryHouses = data.apiData as RecoveryHouseDto[]
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Casas de Recuperação ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Casas de Recuperação ({field.designation})" />
	<meta name="description" content="Casas de recuperação do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, casas de recuperação, projeto">
</svelte:head>

<div class="recovery-houses">
	{#if recoveryHouses.length > 0}
		{#each recoveryHouses as recoveryHouse (recoveryHouse.id)}
			<RecoveryHouse {recoveryHouse} />
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma casa de recuperação.</p>
		</div>
	{/if}
</div>
