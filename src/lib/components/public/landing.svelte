<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/landing.scss';

	//Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBookOpen from 'svelte-icons-pack/fi/FiBookOpen';
	import FiHeart from 'svelte-icons-pack/fi/FiHeart';
	import FiGlobe from 'svelte-icons-pack/fi/FiGlobe';
</script>

<section id="landing">
	<h1 class="headline">{$LL.components.public.landing.headline()}</h1>
	<h2 class="sub-headline">{$LL.components.public.landing.subHeadline()}</h2>
	<a href="#how-to-participate" class="call-to-action"
		>{$LL.components.public.landing.callToAction()}</a
	>

	<div class="cards">
		<div class="card">
			<Icon src={FiBookOpen} className="icon" />
			<h3 class="card-title">{$LL.components.public.landing.cards.firstCard.title()}</h3>
			<p class="card-text">{$LL.components.public.landing.cards.firstCard.text()}</p>
		</div>
		<div class="card">
			<Icon src={FiHeart} className="icon" />
			<h3 class="card-title">{$LL.components.public.landing.cards.secondCard.title()}</h3>
			<p class="card-text">{$LL.components.public.landing.cards.secondCard.text()}</p>
		</div>
		<div class="card">
			<Icon src={FiGlobe} className="icon" />
			<h3 class="card-title">{$LL.components.public.landing.cards.thirdCard.title()}</h3>
			<p class="card-text">{$LL.components.public.landing.cards.thirdCard.text()}</p>
			<a href="#where-we-operate">{$LL.components.public.landing.cards.thirdCard.button()}</a>
		</div>
	</div>
</section>
