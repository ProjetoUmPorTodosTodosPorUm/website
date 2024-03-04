<script lang="ts">
	import '$scss/components/search-field.scss'
	import { page } from '$app/stores'
	import { SearchBox, Pagination } from '$components'
	import type { FieldDto } from '$types'

	$: fields = ($page.data.apiData as FieldDto[]) || []
	$: totalPages = $page.data.totalPages || 1
	$: totalCount = $page.data.totalCount || 0
	$: subRoute = $page.data.searchFieldSubRoute || ''

	function getHref(fieldId: string) {
		if (subRoute) {
			return `/fields/${fieldId}/${subRoute}`
		} else {
			return `/fields/${fieldId}`
		}
	}
</script>

<div class="centered">
	<SearchBox placeholder="Pesquise pelo nome do campo missionário" {totalCount} />

	<div class="data-items">
		{#if fields.length > 0}
			{#each fields as field (field.id)}
				<div class="data-item">
					<span class="designation"><a href={getHref(field.id)}>{field.designation}</a></span>
					<span class="location">{field.country} - {field.state}</span>
					<span class="abbreviation">Código: {field.abbreviation}</span>
				</div>
			{/each}
		{:else}
			<div class="data-item-placeholder">
				<p>Ainda não foi registrado nenhum campo missionário.</p>
			</div>
		{/if}
	</div>

	<Pagination maxPage={totalPages} />
</div>
