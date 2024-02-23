<script lang="ts">
	import '$scss/routes/fields/page.scss'
	import type { PageData } from './$types';
	import type { FieldDto } from '$types'
	import { Navbar , Breadcrumbs, Footer } from '$components'

	export let data: PageData;
	$: field = data.field as FieldDto
</script>

<Navbar />
<section id="main">
	<Breadcrumbs />

	<h1>{field.designation}</h1>
	<h2>{field.country} - {field.state}</h2>
	<p class="sub-title no-text-indent">{field.abbreviation}</p>

	<h3>Páginas</h3>
	<ul class="pages">
		<li>
			<a href="/fields/{field.id}/collaborators">Colaboradores</a>
		</li>
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
			<a href="/fields/{field.id}/collected-offers">Ofertas Coletadas</a>
		</li>
		<li><a href="/fields/{field.id}/reports">Relatórios</a></li>
		<li>
			<a href="/fields/{field.id}/volunteers">Voluntários</a>
		</li>
	</ul>
</section>
<Footer />
