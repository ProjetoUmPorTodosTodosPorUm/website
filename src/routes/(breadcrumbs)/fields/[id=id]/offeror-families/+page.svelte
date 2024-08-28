<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'
	import type { OfferorFamilyDto, FieldDto } from '$types'
	import { SearchOfferorFamily } from '$components'

	export let data: PageData
	$: field = $page.data.field as FieldDto
	$: offerorFamilyData = data.apiData as OfferorFamilyDto[]
	$: totalPages = data.totalPages
	$: totalCount = data.totalCount
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Famílias Ofertantes ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Famílias Ofertantes ({field.designation})" />
	<meta name="description" content="Famílias ofertantes do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, famílias ofertantes, projeto">
</svelte:head>

<SearchOfferorFamily offerorFamilies={offerorFamilyData} {totalPages} {totalCount} />
