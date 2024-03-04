<script lang="ts">
	import { page } from '$app/stores'
	import { Navbar, Breadcrumbs } from '$components'

	$: isNotFoundError = $page.error?.message.toLowerCase() == 'not found'
</script>

<Navbar />
<section id="main">
	<Breadcrumbs />
	<h1>Um Problema Aconteceu</h1>

	{#if isNotFoundError}
		<div>
			A página que você está procurando não existe! <br /><br />
			<a href="/">Voltar para o Início.</a>
		</div>
	{:else}
		<div>
			Erro: {$page.error?.message} <br />
			Caso seja um erro recorrente, nos informe <a href="#footer">entrando em contato</a>. <br /><br />
			<a href="/">Voltar para o Início.</a>
		</div>
	{/if}
</section>
