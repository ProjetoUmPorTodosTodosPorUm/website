<script lang="ts">
	import '$scss/components/values.scss'
	import { PUBLIC_ASSETS_URL } from '$env/static/public'

	//Icons
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiBookOpen from 'svelte-icons-pack/fi/FiBookOpen'
	import FiHeart from 'svelte-icons-pack/fi/FiHeart'
	import FiGlobe from 'svelte-icons-pack/fi/FiGlobe'
</script>

<section id="values">
	<div class="cards">
		<div class="card">
			<Icon src={FiBookOpen} className="icon" />
			<h3 class="card-title">Evangelismo</h3>
			<div class="card-text">
				<p>
					Enquanto muitos cristãos sentem-se seguros na <b><u>comodidade</u></b> de suas Igrejas, como que se estivessem
					pregados nos bancos, milhões estão perecendo. A Igreja de Cristo tem uma grande responsabilidade para com o mundo
					perdido. O Mestre disse:
				</p>
				<p />
				<p>“O campo é o mundo, e a boa semente são os filhos do Reino” <i>Mateus 13.38</i>.</p>
				<p>
					<i>John Wesley</i>, o grande evangelista e fundador do metodismo, captou a visão de Cristo, quando disse: “O
					mundo é a minha Igreja”.
				</p>
			</div>
		</div>
		<div class="card">
			<Icon src={FiHeart} className="icon" />
			<h3 class="card-title">Unidade e União</h3>
			<div class="card-text">
				<p>
					Quando as Igrejas agirem em UNIDADE ininterrupta com demais Igrejas ao entorno, suscitará a UNIÃO das
					famílias, e como boa semente transformará o mundo.<br />
					<i style="float: right;">Wilma Machado</i>
				</p>
			</div>
		</div>
		<div class="card">
			<Icon src={FiGlobe} className="icon" />
			<h3 class="card-title">Propósito</h3>
			<div class="card-text">
				<p>
					De Campo em Campo Missionário no exercício da UNIDADE e UNIÃO, chegar com a Palavra salvífica a todos os
					povos; a todas as nações.
				</p>
				<p>Conheça o mapa do primeiro Campo Missionário do Projeto ”Um por todos! Todos por um”.</p>
			</div>
			<a target="_blank" href="{PUBLIC_ASSETS_URL}/documents/authors-management/11-mapa.webp">Ver Mapa</a>
		</div>
	</div>
</section>
