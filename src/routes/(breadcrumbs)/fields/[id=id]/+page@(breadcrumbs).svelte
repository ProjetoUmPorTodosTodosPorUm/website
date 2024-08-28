<script lang="ts">
	import type { PageData } from './$types'
	import type { FieldDto } from '$types'

	export let data: PageData
	$: field = data.field as FieldDto
</script>

<svelte:head>
	<title>Projeto "Um Por Todos! Todos Por Um" - Campo Missionário {field.designation}</title>
	<meta name="title" content="Projeto &quot;Um Por Todos! Todos Por Um&quot; - Campo Missionário {field.designation}" />
	<meta name="description" content="Páginas referentes ao campo missionário {field.designation} do Projeto &quot;Um Por Todos! Todos Por Um&quot;" />
	<meta name="keywords" content="{field.designation.toLowerCase()}, famílias acolhidas, famílias ofertantes, igrejas em unidade, voluntários administrativos, colaboradores, casas de recuperação, ofertas coletadas, relatórios, projeto">
</svelte:head>

<h1>{field.designation}</h1>
<h2>{field.country} - {field.state}</h2>
<p class="sub-title no-text-indent">{field.abbreviation.toUpperCase()}</p>

<h3 class="pages">Páginas</h3>
<ul class="pages">
	<li>
		<a href="/fields/{field.id}/welcomed-families">Famílias Acolhidas</a>
	</li>
	<li>
		<a href="/fields/{field.id}/offeror-families">Famílias Ofertantes</a>
	</li>
	<li>
		<a href="/fields/{field.id}/churches-in-unity">Igrejas em Unidade</a>
	</li>
	<li>
		<a href="/fields/{field.id}/volunteers">Voluntários Administrativos</a>
	</li>
	<li>
		<a href="/fields/{field.id}/collaborators">Colaboradores</a>
	</li>
	<li>
		<a href="/fields/{field.id}/recovery-houses">Casas de Recuperação</a>
	</li>
	<li>
		<a href="/fields/{field.id}/collected-offers">Ofertas Coletadas</a>
	</li>
	<li><a href="/fields/{field.id}/reports">Relatórios</a></li>
</ul>
