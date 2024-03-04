<script lang="ts">
	import '$scss/components/toast.scss'
	import { createEventDispatcher, onMount } from 'svelte'
	import { fade } from 'svelte/transition'

	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiX from 'svelte-icons-pack/fi/FiX'

	export let id = 0
	export let message = ''
	export let variant = 'danger'
	export let silent = false

	export let isOpen = true
	export let autoHide = true
	export let duration = 5 // in seconds
	export let delay = 0 // in ms

	onMount(async () => {
		if (silent) {
			console.debug(message)
		}
	})

	const dispatch = createEventDispatcher()

	function close() {
		isOpen = false
		dispatch('close', id)
	}

	if (autoHide) {
		setTimeout(() => {
			close()
		}, duration * 1000)
	}
</script>

{#if isOpen && !silent}
	<div in:fade={{ delay }} out:fade class={`toast bg-${variant}`}>
		<div class="toast-body">
			<p>{message}</p>
		</div>
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" on:click|preventDefault={close}>
			<Icon src={FiX} className="toast-close" />
		</a>
	</div>
{/if}
