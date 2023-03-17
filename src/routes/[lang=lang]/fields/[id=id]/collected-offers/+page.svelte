<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';

	export let data: PageData;
	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});

	async function onMontlyOption() {
		await goto(`/${data.locale}/fields/${data.field.id}/collected-offers/monthly`);
	}

	async function onAnnualOption() {
		await goto(`/${data.locale}/fields/${data.field.id}/collected-offers/annual`);
	}
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li>
			<a href="/{data.locale}/fields">{$LL.breadcrumbs.home.fields.text()}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}">{data.field.designation}</a>
		</li>
		<li>
			<a href="/{data.locale}/fields/{data.field.id}/collected-offers"
				>{$LL.breadcrumbs.home.fields.collectedOffers.text()}</a
			>
		</li>
	</ul>

	<h1>Ofertas Coletadas</h1>
	<h2>Campo Missionário - {data.field.designation}</h2>
	<p class="sub-title no-text-indent">{data.field.abbreviation}</p>

	<div class="option-container">
		<button class="option" on:click={onMontlyOption}>Mensal</button>
		<button class="option" on:click={onAnnualOption}>Anual</button>
	</div>
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	@import '$lib/scss/_shared';

	h1,
	h2 {
		margin-bottom: 0.2rem;
	}

	h2 {
		margin-top: 0;
		font-size: calc(var(--h1-font-size) - 0.6rem) !important;
	}

	.option-container {
		min-height: 200px;


		display: flex;
		justify-content: center;
		align-items: center;

		.option {
			font-size: 1.4rem;
			margin-right: 0.5rem;
			padding: 0.2rem 0.5rem;

			background-color: var(--primary-background);
			color: var(--contrast-primary-background);

			border-radius: 0.3rem;
			border: 0.2rem solid rgba(0, 0, 0, 0);

			@include for-md-devices {
				padding: 0.4rem 1rem;
			}

			@include for-lg-devices {
				cursor: pointer;

				&:hover {
					color: var(--link-font-color);
				}
			}
		}
	}

	#main {
		min-height: 300px;

		@include for-xl-devices {
			min-height: 60vh;
		}
	}
</style>
