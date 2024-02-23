<script lang="ts">
	import '$scss/routes/fields/welcomed-families.scss';
	import type { PageData } from './$types';
	import type { WelcomedFamilyDto } from '$types';

	export let data: PageData;
	$: welcomedFamilies = data.apiData as WelcomedFamilyDto[]
</script>

<div class="welcomed-families centered">
	<table>
		<thead>
			<tr>
				<th>Representante</th>
				<th>Observação</th>
			</tr>
		</thead>
		<tbody>
			{#each welcomedFamilies as welcomedFamily (welcomedFamily.id)}
				<tr>
					<td class="rep">{welcomedFamily.representative}</td>
					{#if welcomedFamily.observation}
						<td>{welcomedFamily.observation}</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
