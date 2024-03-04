<script lang="ts">
	import '$scss/components/breadcrumbs.scss'
	import { page } from '$app/stores'
	import { afterNavigate } from '$app/navigation'
	import type { Navigation } from '@sveltejs/kit'
	import type { FieldDto } from '$types'
	import { BREADCRUMBS_LABELS } from '$constants'

	// announcements exception
	export let documentId: string | null = null

	$: field = ($page.data.field as FieldDto) || null

	let routeLevelTwo: string
	let routeLevelThree: string
	let routeLevelFour: string
	let routeLevelFive: string

	$: levelOneRouteText = BREADCRUMBS_LABELS.home.text
	$: levelTwoRouteText = routeLevelTwo ? BREADCRUMBS_LABELS[routeLevelTwo]?.text : ''
	$: levelThreeRouteText = routeLevelThree && !field ? BREADCRUMBS_LABELS[routeLevelTwo][routeLevelThree]?.text : ''
	$: levelFourRouteText =
		routeLevelFour && !field && BREADCRUMBS_LABELS[routeLevelTwo][routeLevelThree]
			? BREADCRUMBS_LABELS[routeLevelTwo][routeLevelThree][routeLevelFour]?.text
			: ''
	$: levelFourRouteFieldText = routeLevelFour && field ? BREADCRUMBS_LABELS[routeLevelTwo][routeLevelFour]?.text : ''
	$: levelFiveRouteText =
		routeLevelFive && BREADCRUMBS_LABELS[routeLevelTwo][routeLevelFour]
			? BREADCRUMBS_LABELS[routeLevelTwo][routeLevelFour][routeLevelFive]?.text
			: ''

	afterNavigate(async (navigation: Navigation) => {
		// -2 discounts '' and (breadcrumbs) item from routeId array (from split('/'))
		// 2 as padding for accessing the route hierarchy
		const SPLIT_PADDING = 2
		const routeId = navigation.to?.route.id

		routeLevelTwo = routeId?.split('/')[SPLIT_PADDING] || ''
		routeLevelThree = routeId?.split('/')[SPLIT_PADDING + 1] || ''
		routeLevelFour = routeId?.split('/')[SPLIT_PADDING + 2] || ''
		routeLevelFive = routeId?.split('/')[SPLIT_PADDING + 3] || ''
	})
</script>

<ul class="breadcrumb">
	{#if $page.error}
		<li><a href="/">Ops...</a></li>
	{:else}
		<li><a href="/">{levelOneRouteText}</a></li>

		{#if routeLevelTwo}
			<li><a href="/{routeLevelTwo}">{levelTwoRouteText}</a></li>
		{/if}
		{#if routeLevelThree && !field}
			<li><a href="/{routeLevelTwo}/{documentId ?? routeLevelThree}">{levelThreeRouteText}</a></li>
		{:else if field}
			<li><a href="/{routeLevelTwo}/{field?.id}">{field?.designation}</a></li>
		{/if}
		{#if routeLevelFour && !field}
			<li><a href="/{routeLevelTwo}/{routeLevelThree}/{routeLevelFour}">{levelFourRouteText}</a></li>
		{:else if routeLevelFour && field}
			<li><a href="/{routeLevelTwo}/{field?.id}/{routeLevelFour}">{levelFourRouteFieldText}</a></li>
		{/if}
		{#if routeLevelFive}
			<li>
				<a href="/{routeLevelTwo}/{field?.id}/{routeLevelFour}/{routeLevelFive}">{levelFiveRouteText}</a>
			</li>
		{/if}
	{/if}
</ul>
