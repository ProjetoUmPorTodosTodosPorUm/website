<script lang="ts">
	import '$scss/components/search-box.scss'
	import { goto, invalidate } from '$app/navigation'
	import { page } from '$app/stores'
	import { DEPENDENCY_URLS } from '$constants'
	import type { Pagination } from '$types'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiSearch from 'svelte-icons-pack/fi/FiSearch'

	// Constants
	const TYPING_COOL_DOWN = 300 // in MS
	const MIN_LENGTH = 3

	// Component Data
	export let placeholder = 'Pesquise Aqui...'
	export let type: 'text' | 'number' = 'text'
	export let totalCount = 0

	export let orderKey = ''
	export let orderValue: Pagination['orderValue'] = undefined
	export let invalidateString = DEPENDENCY_URLS.listLoad

	let search = $page.url.searchParams.get('search') || ''
	$: search, updateSearch()

	// Typing
	let typingTimer: NodeJS.Timeout

	function startTypingCountDown() {
		clearTimeout(typingTimer)
		typingTimer = setTimeout(async () => {
			if (search.length >= MIN_LENGTH) {
				await goto($page.url.href, { keepFocus: true })
				await invalidate(invalidateString)
			} else if (search.length === 0) {
				await goto($page.url.href, { keepFocus: true })
				await invalidate(invalidateString)
			}
		}, TYPING_COOL_DOWN)
	}

	function clearTypingCountDown(event: KeyboardEvent) {
		filter(event)
		clearTimeout(typingTimer)
	}

	function filter(event: KeyboardEvent) {
		const whitelistKeys = ['Backspace', ',', '.']

		if (type === 'number') {
			if ((!whitelistKeys.includes(event.key) && isNaN(Number(event.key))) || event.code == 'Space') {
				event.preventDefault()
			}
		}
	}

	function updateSearch() {
		if (search.length >= MIN_LENGTH) {
			$page.url.searchParams.set('search', search)
			if (orderKey) $page.url.searchParams.set('orderKey', orderKey)
			if (orderValue) $page.url.searchParams.set('orderValue', orderValue)
		} else {
			$page.url.searchParams.delete('search')
			if (orderKey) $page.url.searchParams.delete('orderKey')
			if (orderValue) $page.url.searchParams.delete('orderValue')
		}

		$page.url.searchParams.set('page', '1')
	}
</script>

<div class="search-box">
	<div class="search">
		<input
			bind:value={search}
			on:keyup={startTypingCountDown}
			on:keydown={clearTypingCountDown}
			type="text"
			{placeholder}
		/>
		<button><Icon src={FiSearch} /></button>
	</div>
	<div class="info">Items: {totalCount}</div>
</div>
