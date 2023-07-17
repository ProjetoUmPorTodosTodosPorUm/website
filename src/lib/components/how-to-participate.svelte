<script lang="ts">
	import '$scss/components/how-to-participate.scss';
	import { onMount } from 'svelte';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['how-to-participate-component'];

	export let locale: Locales;

	onMount(async () => {
		await loadNamespaceAsync(locale, 'how-to-participate-component');
		setLocale(locale);
	});
</script>

<section id="how-to-participate">
	<div class="form">
		<h2>{i18n.callToAction.text()}</h2>
		<form>
			<div class="messages" />
			<input
				type="text"
				name="name"
				id="subscribe-name"
				placeholder={i18n.callToAction.nameInput()}
			/>
			<input
				type="email"
				name="email"
				id="subscribe-email"
				placeholder={i18n.callToAction.emailInput()}
			/>

			<button type="submit">{i18n.callToAction.button()}</button>
		</form>
	</div>
	<div class="text">
		<h1 class="headline">{i18n.headline()}</h1>
		<p>
			{@html i18n.firstParagraph()}
		</p>

		<p>
			{@html i18n.secondParagraph()}
		</p>
	</div>
</section>
