<script lang="ts">
	import '$scss/components/landing.scss'
	import { PUBLIC_ASSETS_URL } from '$env/static/public'
	import { fade } from 'svelte/transition'
</script>

<section id="landing">
	<div class="wrap-logo-headline">
		<div class="logo">
			<img in:fade out:fade src="{PUBLIC_ASSETS_URL}/images/logo.webp" alt="Logo" />
		</div>
		<div class="separator" />
		<div class="headline">
			<h2>Projeto</h2>
			<h1>"Um Por Todos!</h1>
			<h1>Todos Por Um."</h1>
			<h3>UNIDADE E UNIÃO</h3>
		</div>
	</div>

	<h2 class="sub-headline">
		O Projeto “Um por todos! Todos por um”, <b>nada mais é</b> do que o novo
		<b>“Sistema de Evangelização Acrescido de Ação Social”</b>; cuja característica própria é a UNIDADE e UNIÃO. No
		sentido mais amplo é, sem dúvida alguma uma nova <i>“Ferramenta Missionária”</i>
		ou se preferir pode-se dizer que é uma <i>“Ferramenta de Evangelização”</i> ou ainda melhor dizendo é uma imensa;
		<i>“Rede de Pescar”</i>
		com várias pontas, lançada sobre todas as nações.
	</h2>
	<a href="#how-to-participate" class="call-to-action">Desejo Participar</a>
	<div class="citations">
		<div class="item">
			<p>"Jesus, porém, conhecendo os seus pensamentos, disse-lhes: Todo o reino dividido contra si mesmo é devastado; e toda a cidade, ou casa, dividida contra si mesma não subsistirá."</p>
			<i>(Mateus 12:25)</i>
		</div>

		<div class="item">
			<p>"[...] Ide por todo omundo, pregai o evangelho a toda criatura. Quem crer e for batizado será salvo; mas quem não crer será condenado."</p>
			<i>(Marcos 15:15-16)</i>
		</div>
	</div>
</section>
