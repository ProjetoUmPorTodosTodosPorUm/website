<script lang="ts">
	import '$scss/components/volunteer.scss'
	import type { VolunteerDto } from '../types'
	import { VOLUNTEERS_OCCUPATIONS } from '$constants'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	export let volunteer: VolunteerDto
	const occupations = [
		{ value: 'PRESIDENT', text: VOLUNTEERS_OCCUPATIONS.president },
		{ value: 'VICE_PRESIDENT', text: VOLUNTEERS_OCCUPATIONS.vicePresident },
		{ value: 'GENERAL_COORDINATOR', text: VOLUNTEERS_OCCUPATIONS.geralCoordinator },
		{ value: 'COORDINATOR_01', text: VOLUNTEERS_OCCUPATIONS.coordinator01 },
		{ value: 'COUNSELOR_01', text: VOLUNTEERS_OCCUPATIONS.counselor01 },
		{ value: 'COUNSELOR_02', text: VOLUNTEERS_OCCUPATIONS.counselor02 },
		{ value: 'COUNSELOR_03', text: VOLUNTEERS_OCCUPATIONS.counselor03 },
		{ value: 'WEB_MASTER', text: VOLUNTEERS_OCCUPATIONS.webMaster },
		{ value: 'TREASURER_01', text: VOLUNTEERS_OCCUPATIONS.treasurer01 },
		{ value: 'TREASURER_02', text: VOLUNTEERS_OCCUPATIONS.treasurer02 },
		{ value: 'ACADEMIC_INSTRUCTOR_01', text: VOLUNTEERS_OCCUPATIONS.academicInstructor01 },
		{ value: 'ACADEMIC_INSTRUCTOR_02', text: VOLUNTEERS_OCCUPATIONS.academicInstructor02 },
		{ value: 'EXECUTIVE_SECRETARY', text: VOLUNTEERS_OCCUPATIONS.executiveSecretary },
		{ value: 'AUXILIARY_SECRETARY', text: VOLUNTEERS_OCCUPATIONS.auxiliarySecretary },
		{ value: 'COORDINATOR_02', text: VOLUNTEERS_OCCUPATIONS.coordinator02 },
		{ value: 'INFIELD_COORDINATOR', text: VOLUNTEERS_OCCUPATIONS.infieldCoordinator },
		{ value: 'OUTFIELD_COORDINATOR', text: VOLUNTEERS_OCCUPATIONS.outfieldCoordinator },
		{ value: 'COLLECTOR', text: VOLUNTEERS_OCCUPATIONS.collector },
		{ value: 'SUPPORT_SERVICE', text: VOLUNTEERS_OCCUPATIONS.supportService }
	]
</script>

<div class="volunteer">
	<div class="head">
		<div class="image">
			<img
				src={volunteer.avatar
					? `${PUBLIC_FILES_URL}/${volunteer.avatar}`
					: 'https://placehold.co/300x400?text=Voluntário'}
				alt="{volunteer.firstName} {volunteer.lastName}"
			/>
			<div class="overlay">
				<h4>{`${volunteer.firstName} ${volunteer.lastName}`}</h4>
			</div>
		</div>
		<p class="sub-title no-text-indent">{occupations.filter((occ) => occ.value == volunteer.occupation)[0].text}</p>
	</div>
	<div class="body">
		{#if volunteer.church}<span class="church">Igreja: {volunteer.church}</span>{/if}
		{#if volunteer.priest}<span class="priest">Pastor: {volunteer.priest}</span>{/if}
		<span class="joined-date">Desde: {new Date(volunteer.joinedDate).toLocaleDateString('pt-BR')}</span>
	</div>
</div>
