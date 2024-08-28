<script lang="ts">
	import '$scss/routes/fields/oferror-families.scss'
	import { SearchField } from '$components'
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Famílias Ofertantes (por campo)</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Famílias Ofertantes (por campo)" />
	<meta name="description" content="Encontre as Famílias Ofertantes do Projeto &quot;Um Por Todos! Todos Por Um&quot;" />
	<meta name="keywords" content="família, ofertante, pesquisa, busca, projeto">
</svelte:head>

<h1>Famílias Ofertantes</h1>
<div class="reset-option">
	<button><a href="/fields/offeror-families">Voltar</a></button>
</div>

<SearchField />
