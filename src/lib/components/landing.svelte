<script lang="ts">
	import '$scss/components/landing.scss';
	import { onMount } from 'svelte';

	//Icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiBookOpen from 'svelte-icons-pack/fi/FiBookOpen';
	import FiHeart from 'svelte-icons-pack/fi/FiHeart';
	import FiGlobe from 'svelte-icons-pack/fi/FiGlobe';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['landing'];

	export let locale: Locales;

	onMount(async () => {
		await loadNamespaceAsync(locale, 'landing');
		setLocale(locale);
	});
</script>

<section id="landing">
	<div class="headline">
		<h1>{i18n.headline.firstLine()}</h1>
		<h2 class="project-font">{i18n.headline.secondLine()}</h2>
		<h2 class="project-font">{i18n.headline.thirdLine()}</h2>
		<h3>{i18n.headline.lastLine()}</h3>
	</div>

	<h2 class="sub-headline">{i18n.subHeadline()}</h2>
	<a href="#how-to-participate" class="call-to-action">{i18n.callToAction()}</a>

	<div class="cards">
		<div class="card">
			<Icon src={FiBookOpen} className="icon" />
			<h3 class="card-title">{i18n.cards.firstCard.title()}</h3>
			<p class="card-text">{i18n.cards.firstCard.text()}</p>
		</div>
		<div class="card">
			<Icon src={FiHeart} className="icon" />
			<h3 class="card-title">{i18n.cards.secondCard.title()}</h3>
			<p class="card-text">{i18n.cards.secondCard.text()}</p>
		</div>
		<div class="card">
			<Icon src={FiGlobe} className="icon" />
			<h3 class="card-title">{i18n.cards.thirdCard.title()}</h3>
			<p class="card-text">{i18n.cards.thirdCard.text()}</p>
			<a href="#where-we-operate">{i18n.cards.thirdCard.button()}</a>
		</div>
	</div>
</section>
