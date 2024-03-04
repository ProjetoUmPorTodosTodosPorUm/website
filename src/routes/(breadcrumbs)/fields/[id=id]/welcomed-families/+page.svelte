<script lang="ts">
	import '$scss/routes/fields/welcomed-families.scss'
	import type { PageData } from './$types'
	import type { WelcomedFamilyDto } from '$types'
	import { WelcomedFamiliesVisualizer } from '$components'

	export let data: PageData
	$: welcomedFamilies = data.apiData as WelcomedFamilyDto[]
</script>

<!-- <WelcomedFamiliesVisualizer /> -->

<div class="welcomed-families centered">
	{#if welcomedFamilies.length > 0}
		{#each welcomedFamilies as welcomedFamily (welcomedFamily.id)}
			<div class="welcomed-family">
				<div class="family">{welcomedFamily.representative}</div>
				<div class="family-sub">Família representada por</div>
			</div>
		{/each}
	{:else}
		<div class="text-placeholder">
			<p>Ainda não foi registrada nenhuma família acolhida.</p>
		</div>
	{/if}
</div>
