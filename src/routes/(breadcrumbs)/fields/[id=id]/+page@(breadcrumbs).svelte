<script lang="ts">
	import type { PageData } from './$types'
	import type { FieldDto } from '$types'

	export let data: PageData
	$: field = data.field as FieldDto
</script>

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
