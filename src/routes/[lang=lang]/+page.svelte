<script lang="ts">
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Landing from '$lib/components/public/landing.svelte';
	import HowToParticipate from '$lib/components/public/how-to-participate.svelte';
	import Faq from '$lib/components/public/faq.svelte';
	import AgendaAnnouncement from '$lib/components/public/agenda-announcement.svelte';
	import WhereWeOperate from '$lib/components/public/where-we-operate.svelte';
	import Testimonial from '$lib/components/public/testimonial.svelte';
	import Footer from '$lib/components/public/footer.svelte';

	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import { setLocale } from '$i18n/i18n-svelte';
	import type { Namespaces } from '$i18n/i18n-types';

	export let data: PageData;

	const namespaces: Namespaces[] = ['components'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<Landing />
<HowToParticipate />
<Faq />
<AgendaAnnouncement locale={data.locale} />
<WhereWeOperate />
<Testimonial />
<Footer locale={data.locale} {namespaces} />
