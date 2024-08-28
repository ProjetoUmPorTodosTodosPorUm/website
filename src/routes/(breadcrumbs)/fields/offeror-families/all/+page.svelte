<script lang="ts">
	import '$scss/routes/fields/oferror-families.scss'
	import type { PageData } from './$types'
	import type { OfferorFamilyDto } from '$types'

	import { SearchOfferorFamily } from '$components'

	export let data: PageData

	$: offerorFamilyData = data.apiData as OfferorFamilyDto[]
	$: totalCount = data.totalCount
	$: totalPages = data.totalPages
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Famílias Ofertantes (todos)</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Famílias Ofertantes (todos)" />
	<meta name="description" content="Encontre as Famílias Ofertantes do Projeto &quot;Um Por Todos! Todos Por Um&quot;" />
	<meta name="keywords" content="família, ofertante, pesquisa, busca, projeto">
</svelte:head>

<h1>Famílias Ofertantes</h1>
<div class="reset-option">
	<button><a href="/fields/offeror-families">Voltar</a></button>
</div>

<SearchOfferorFamily offerorFamilies={offerorFamilyData} {totalPages} {totalCount} />
