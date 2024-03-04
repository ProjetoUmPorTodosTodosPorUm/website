<script lang="ts">
	import '$scss/routes/fields/volunteers.scss'
	import type { PageData } from './$types'
	import { sortVolunteersByOccupations } from '$utils'
	import type { VolunteerDto } from '$types'
	import { Occupation } from '$enums'
	import { Volunteer } from '$components'

	export let data: PageData

	const firstSectionOccs = [
		Occupation.PRESIDENT,
		Occupation.VICE_PRESIDENT,
		Occupation.GENERAL_COORDINATOR,
		Occupation.COORDINATOR_01,
		Occupation.COUNSELOR_01,
		Occupation.COUNSELOR_02,
		Occupation.COUNSELOR_03,
		Occupation.WEB_MASTER,
		Occupation.TREASURER_01,
		Occupation.TREASURER_02,
		Occupation.ACADEMIC_INSTRUCTOR_01,
		Occupation.ACADEMIC_INSTRUCTOR_02,
		Occupation.EXECUTIVE_SECRETARY,
		Occupation.AUXILIARY_SECRETARY
	]
	const secondSectionOccs = [Occupation.COORDINATOR_02, Occupation.INFIELD_COORDINATOR, Occupation.OUTFIELD_COORDINATOR]
	const thirdSectionOccs = [Occupation.COLLECTOR, Occupation.SUPPORT_SERVICE]

	$: volunteers = sortVolunteersByOccupations(data.apiData, [
		...firstSectionOccs,
		...secondSectionOccs,
		...thirdSectionOccs
	]) as VolunteerDto[]

	$: firstSectionVols = volunteers.filter((vol) => firstSectionOccs.includes(vol.occupation))
	$: secondSectionVols = volunteers.filter((vol) => secondSectionOccs.includes(vol.occupation))
	$: thirdSectionVols = volunteers.filter((vol) => thirdSectionOccs.includes(vol.occupation))
</script>

<div class="volunteers">
	{#if firstSectionVols.length > 0}
		<h3>Setor Operacional de Missões</h3>
	{/if}
	<div class="volunteers-wrap">
		{#each firstSectionVols as volunteer}
			<Volunteer {volunteer} />
		{/each}
	</div>

	{#if secondSectionVols.length > 0}
		<h3>Serviço Interno e Externo</h3>
	{/if}
	<div class="volunteers-wrap">
		{#each secondSectionVols as volunteer}
			<Volunteer {volunteer} />
		{/each}
	</div>

	{#if thirdSectionVols.length > 0}
		<h3>Serviço de Apoio</h3>
	{/if}
	<div class="volunteers-wrap">
		{#each thirdSectionVols as volunteer}
			<Volunteer {volunteer} />
		{/each}
	</div>

	{#if data.apiData.length == 0}
		<div class="text-placeholder">
			<p>Ainda não foi registrado nenhum voluntário administrativo.</p>
		</div>
	{/if}
</div>
