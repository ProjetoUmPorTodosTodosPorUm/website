<script lang="ts">
	import '$scss/components/switch-theme.scss'
	import { onMount } from 'svelte'

	//icons
	import { Icon } from 'svelte-icons-pack'
	import { FiMoon, FiSun } from 'svelte-icons-pack/fi'

	let checked: boolean

	onMount(() => {
		const theme = window.localStorage.getItem('theme') ?? 'light'

		switch (theme) {
			case 'light':
				checked = false
				_changeTheme('light')
				break
			case 'dark':
				checked = true
				_changeTheme('dark')
				break
			default:
				checked = false
				_changeTheme('light')
		}
	})

	function _changeTheme(theme: 'light' | 'dark') {
		const htmlElement = document.getElementsByTagName('html')[0]
		htmlElement.classList.value = theme
		window.localStorage.setItem('theme', theme)
	}

	function changeTheme(checked: boolean) {
		switch (checked) {
			case false:
				_changeTheme('light')
				break
			case true:
				_changeTheme('dark')
				break
			default:
				_changeTheme('light')
		}
	}
</script>

<div class="switch-theme">
	<label class="switch">
		<input bind:checked type="checkbox" on:change={(ev) => changeTheme(ev.currentTarget.checked)} title="Mudar Tema" />
		{#if checked}
			<Icon src={FiSun} className="icon" />
		{:else}
			<Icon src={FiMoon} className="icon" />
		{/if}
	</label>
</div>
