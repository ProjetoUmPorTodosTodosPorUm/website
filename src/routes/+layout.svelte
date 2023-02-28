<script lang="ts">
	import { SettingsStore } from '$lib/store/settings';
	import { setContext } from 'svelte';

	setContext('settingsStore', new SettingsStore());
</script>

<slot />
