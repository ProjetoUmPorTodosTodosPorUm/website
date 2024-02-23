<script lang="ts">
	import '$scss/routes/fields/volunteers.scss';
	import type { PageData } from './$types';

	import { sortVolunteersByOccupations } from '$utils';
	import type { FieldDto, VolunteerDto } from '$types';
	import { Occupation } from '$enums';

	export let data: PageData;

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

	const secondSectionOccs = [
		Occupation.COORDINATOR_02,
		Occupation.INFIELD_COORDINATOR,
		Occupation.OUTFIELD_COORDINATOR
	]

	const thirdSectionOccs = [Occupation.COLLECTOR, Occupation.SUPPORT_SERVICE]

	$: field = data.field as FieldDto
	$: volunteers = sortVolunteersByOccupations(data.apiData, [
		...firstSectionOccs,
		...secondSectionOccs,
		...thirdSectionOccs
	]) as VolunteerDto[]


	$: firstSectionVols = volunteers.filter((vol) => firstSectionOccs.includes(vol.occupation));
	$: secondSectionVols = volunteers.filter((vol) => secondSectionOccs.includes(vol.occupation));
	$: thirdSectionVols = volunteers.filter((vol) => thirdSectionOccs.includes(vol.occupation));
</script>

<div class="volunteers">
	<h3>Setor Operacional de Missões</h3>
	{#each firstSectionVols as volunteer}
		<div class="volunteer">
			<div class="head">
				<img src="https://via.placeholder.com/300x300.webp" alt="Profile" />
				<h3>{`${volunteer.firstName} ${volunteer.lastName}`}</h3>
				<p>{volunteer.occupation}</p>
			</div>
			<div class="body">
				<ul>
					<li>{volunteer.church}</li>
					<li>{volunteer.priest}</li>
					<li>Data de Entrada: {new Date(volunteer.joinedDate).toLocaleDateString()}</li>
				</ul>
			</div>
			<div class="footer">
				<p>{volunteer.observation}</p>
			</div>
		</div>
	{/each}
	
	<h3>Serviço Interno e Externo</h3>
	{#each secondSectionVols as volunteer}
		<div class="volunteer">
			<div class="head">
				<img src="https://via.placeholder.com/300x300.webp" alt="Profile" />
				<h3>{`${volunteer.firstName} ${volunteer.lastName}`}</h3>
				<p>{volunteer.occupation}</p>
			</div>
			<div class="body">
				<ul>
					<li>{volunteer.church}</li>
					<li>{volunteer.priest}</li>
					<li>Data de Entrada: {new Date(volunteer.joinedDate).toLocaleDateString()}</li>
				</ul>
			</div>
			<div class="footer">
				<p>{volunteer.observation}</p>
			</div>
		</div>
	{/each}

	<h3>Serviço de Apoio</h3>
	{#each thirdSectionVols as volunteer}
		<div class="volunteer">
			<div class="head">
				<img src="https://via.placeholder.com/300x300.webp" alt="Profile" />
				<h3>{`${volunteer.firstName} ${volunteer.lastName}`}</h3>
				<p>{volunteer.occupation}</p>
			</div>
			<div class="body">
				<ul>
					<li>{volunteer.church}</li>
					<li>{volunteer.priest}</li>
					<li>Data de Entrada: {new Date(volunteer.joinedDate).toLocaleDateString()}</li>
				</ul>
			</div>
			<div class="footer">
				<p>{volunteer.observation}</p>
			</div>
		</div>
	{/each}
</div>
