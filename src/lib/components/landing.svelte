<script lang="ts">
	import '$scss/components/landing.scss';

	//Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBookOpen from 'svelte-icons-pack/fi/FiBookOpen';
	import FiHeart from 'svelte-icons-pack/fi/FiHeart';
	import FiGlobe from 'svelte-icons-pack/fi/FiGlobe';
</script>

<section id="landing">
	<div class="headline">
		<h1>Projeto</h1>
		<h2 class="project-font">"Um Por Todos!</h2>
		<h2 class="project-font">Todos Por Um."</h2>
		<h3>Unidade e União</h3>
	</div>

	<h2 class="sub-headline">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</h2>
	<a href="#how-to-participate" class="call-to-action">Desejo Participar</a>

	<div class="cards">
		<div class="card">
			<Icon src={FiBookOpen} className="icon" />
			<h3 class="card-title">Evangelização</h3>
			<p class="card-text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,</p>
		</div>
		<div class="card">
			<Icon src={FiHeart} className="icon" />
			<h3 class="card-title">Unidade e União</h3>
			<p class="card-text">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,</p>
		</div>
		<div class="card">
			<Icon src={FiGlobe} className="icon" />
			<h3 class="card-title">Onde Atuamos</h3>
			<p class="card-text">Ver no Mapa</p>
			<a href="#where-we-operate">Ver no Mapa</a>
		</div>
	</div>
</section>
