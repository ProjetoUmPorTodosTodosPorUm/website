<script lang="ts">
	import '$scss/components/search-field.scss';
	import type { OfferorFamilyDto } from '$types';
	import { SearchBox, Pagination } from '$components'
	
	export let offerorFamilies: OfferorFamilyDto[] = [];
	export let totalPages: number = 1
</script>

<div class="centered">
	<SearchBox
		showDropdown={false}
		placeholder="Pesquise pelo representante da família"
        orderKey="representative"
        orderValue="asc"
	/>

	<div class="data-items">
		{#each offerorFamilies as offerorFamily (offerorFamily.id)}
			<div class="data-item">
				<ul class="simple-ulist">
					<li>{offerorFamily.representative}</li>
					<li>Compromisso: {offerorFamily.commitment}</li>
					<li>Grupo: {offerorFamily.group}</li>
					{#if offerorFamily.chuchDenomination}
						<li>Igreja: {offerorFamily.chuchDenomination}</li>
					{/if}
				</ul>
			</div>
		{/each}
	</div>

	<Pagination maxPage={totalPages} />
</div>
