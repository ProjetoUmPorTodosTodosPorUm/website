<script lang="ts">
	import '$scss/components/search-field.scss';
	import { page } from '$app/stores'
	import { SearchBox, Pagination } from '$components'
	import type { FieldDto } from '$types';
	
	$: fields = $page.data.apiData as FieldDto[] || []
	$: totalPages = $page.data.totalPages || 1
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
	<SearchBox
		showDropdown={false}
		placeholder="Pesquise pelo nome do campo missionário"
	/>

	<div class="data-items">
		{#each fields as field (field.id)}
			<div class="data-item">
				<a href={getHref(field.id)}>
					{field.designation}<br />
					{field.country} - {field.state}<br />
					Código: {field.abbreviation}
				</a>
			</div>
		{/each}
	</div>

	<Pagination maxPage={totalPages} />
</div>
