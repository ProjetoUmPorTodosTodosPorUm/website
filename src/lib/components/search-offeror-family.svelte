<script lang="ts">
	import '$scss/components/search-offeror-family.scss'
	import type { OfferorFamilyDto } from '$types'
	import { SearchBox, Pagination } from '$components'
	import { OFFEROR_FAMILY_GROUP } from '$constants'

	export let offerorFamilies: OfferorFamilyDto[] = []
	export let totalPages: number = 1
	export let totalCount: number = 0
</script>

<div class="centered">
	<SearchBox
		placeholder="Pesquise pelo representante da família"
		orderKey="representative"
		orderValue="asc"
		{totalCount}
	/>

	<div class="data-items">
		{#if offerorFamilies.length > 0}
			{#each offerorFamilies as offerorFamily (offerorFamily.id)}
				<div class="data-item">
					<span class="representative">{offerorFamily.representative}</span>
					{#if offerorFamily.chuchDenomination}
						<span class="church">Igreja: {offerorFamily.chuchDenomination}</span>
					{/if}
					<span class="commitment">Compromisso: {offerorFamily.commitment}</span>
					<span class="group">Grupo: {OFFEROR_FAMILY_GROUP[offerorFamily.group.toLowerCase()]}</span>
				</div>
			{/each}
		{:else}
			<div class="data-item-placeholder">
				<p>Ainda não foi registrada nenhuma família ofertante.</p>
			</div>
		{/if}
	</div>

	<Pagination maxPage={totalPages} />
</div>
