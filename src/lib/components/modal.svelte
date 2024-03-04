<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'
	import '$scss/components/modal.scss'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiX from 'svelte-icons-pack/fi/FiX'

	const FADE_TIME = 150 // ms

	const dispatch = createEventDispatcher()
	const close = () => dispatch('close')

	export let show = false
	let modal: HTMLDivElement
	$: visibility = show ? 'visible' : 'hidden'

	const handle_keydown = (e: KeyboardEvent) => {
		if (!show) return

		if (e.key === 'Escape') {
			close()
			return
		}

		if (e.key === 'Tab') {
			if (!show) return

			// trap focus
			const nodes = modal.querySelectorAll<HTMLDivElement>('*')
			const tabbable = Array.from(nodes).filter((n) => n.tabIndex >= 0)

			// @ts-ignore
			let index = tabbable.indexOf(document.activeElement)
			if (index === -1 && e.shiftKey) index = 0

			index += tabbable.length + (e.shiftKey ? -1 : 1)
			index %= tabbable.length

			tabbable[index].focus()
			e.preventDefault()
		}
	}

	const previously_focused = typeof document !== 'undefined' && document.activeElement

	if (previously_focused) {
		onDestroy(() => {
			// @ts-ignore
			previously_focused.focus()
		})
	}
</script>

<svelte:window on:keydown={handle_keydown} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	in:fade={{ delay: FADE_TIME }}
	out:fade
	on:click={close}
	style="visibility: {visibility}"
	class="modal-background"
/>

<div
	bind:this={modal}
	in:fade={{ delay: FADE_TIME }}
	out:fade
	style="visibility: {visibility}"
	class="modal"
	role="dialog"
	aria-modal="true"
>
	<div class="modal-header">
		<slot name="header" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click={close} class="wrap-btn-close">
			<Icon src={FiX} className="btn-close" />
		</div>
	</div>
	<slot />
</div>
