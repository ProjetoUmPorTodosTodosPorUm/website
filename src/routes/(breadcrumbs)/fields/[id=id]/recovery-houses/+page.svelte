<script lang="ts">
	import '$scss/routes/fields/recovery-houses.scss'
	import type { PageData } from './$types'
	import type { RecoveryHouseDto } from '$types'
	import { RecoveryHouse } from '$components'

	export let data: PageData
	$: recoveryHouses = data.apiData as RecoveryHouseDto[]
</script>

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
