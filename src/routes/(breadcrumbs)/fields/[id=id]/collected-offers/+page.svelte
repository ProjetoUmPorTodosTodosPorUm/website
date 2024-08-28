<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss'
	import type { PageData } from './$types'
	import type { FieldDto } from '$types'

	export let data: PageData
	$: field = data.field as FieldDto
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Ofertas Coletadas ({field.designation})</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Ofertas Coletadas ({field.designation})" />
	<meta name="description" content="Encontre as ofertas coletadas do campo missionário {field.designation}." />
	<meta name="keywords" content="{field.designation.toLowerCase()}, ofertas coletadas, pesquisa, busca, projeto">
</svelte:head>

<div class="option-container">
	<button class="option"><a href={`/fields/${field.id}/collected-offers/monthly`}>Mensal</a></button>
	<button class="option"><a href={`/fields/${field.id}/collected-offers/annual`}>Anual</a></button>
</div>
