<script lang="ts">
	import type { PageData } from './$types';
	import MainNavbar from '$lib/components/navbar.svelte';
	import Landing from '$lib/components/landing.svelte';
	import HowToParticipate from '$lib/components/how-to-participate.svelte';
	import Faq from '$lib/components/faq.svelte';
	import AgendaAnnouncement from '$lib/components/agenda-announcement.svelte';
	import WhereWeOperate from '$lib/components/where-we-operate.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import Footer from '$lib/components/footer.svelte';
	import type { Namespaces } from '$i18n/i18n-types';

	export let data: PageData;

	const namespaces = [
		'landing',
		'how-to-participate-component',
		'faq',
		'agenda-announcement',
		'testimonial'
	] as Namespaces[];
</script>

<MainNavbar locale={data.locale} />
<Landing locale={data.locale} />
<HowToParticipate locale={data.locale} />
<Faq locale={data.locale} />
<AgendaAnnouncement locale={data.locale} />
<WhereWeOperate />
<Testimonial locale={data.locale} />
<Footer locale={data.locale} {namespaces} />
