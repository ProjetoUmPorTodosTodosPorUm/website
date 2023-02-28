<script lang="ts">
	import '$lib/scss/components/public/search-box.scss';
	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiSearch from 'svelte-icons-pack/fi/FiSearch';

	const TYPING_COOL_DOWN = 300; // in MS
	let typingTimer: NodeJS.Timeout;
	let resContainerRef: HTMLDivElement;

	export let isDropdownOpen = false;
	export let showDropdown = true;
	export let searchInput = '';
	export let searchPlaceholder = '';
	export let loadData: () => Promise<void>;

	$: {
		if (resContainerRef && isDropdownOpen) {
			resContainerRef.classList.add('open');
		} else if(resContainerRef) {
			resContainerRef.classList.remove('open');
		}
	}

	function startTypingCountDown() {
		clearTimeout(typingTimer);
		typingTimer = setTimeout(loadData, TYPING_COOL_DOWN);
	}

	function clearTypingCountDown() {
		clearTimeout(typingTimer);
	}
</script>

<div class="search-box">
	<div class="search">
		<input
			bind:value={searchInput}
			on:keyup={startTypingCountDown}
			on:keydown={clearTypingCountDown}
			type="text"
			placeholder={searchPlaceholder}
		/>
		<button><Icon src={FiSearch} /></button>
	</div>

	<div bind:this={resContainerRef} class="res-items">
		{#if showDropdown}
			<slot />
		{/if}
	</div>
</div>
