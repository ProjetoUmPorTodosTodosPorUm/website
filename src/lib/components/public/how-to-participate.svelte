<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import '$lib/scss/components/public/how-to-participate.scss';
</script>

<section id="how-to-participate">
	<div class="form">
		<h2>{$LL.components.public.howToParticipate.callToAction.text()}</h2>
		<form>
			<div class="messages" />
			<input
				type="text"
				name="name"
				id="subscribe-name"
				placeholder={$LL.components.public.howToParticipate.callToAction.nameInput()}
			/>
			<input
				type="email"
				name="email"
				id="subscribe-email"
				placeholder={$LL.components.public.howToParticipate.callToAction.emailInput()}
			/>

			<button type="submit">{$LL.components.public.howToParticipate.callToAction.button()}</button>
		</form>
	</div>
	<div class="text">
		<h1 class="headline">{$LL.components.public.howToParticipate.headline()}</h1>
		<p>
			{@html $LL.components.public.howToParticipate.firstParagraph()}
		</p>

		<p>
			{@html $LL.components.public.howToParticipate.secondParagraph()}
		</p>
	</div>
</section>
