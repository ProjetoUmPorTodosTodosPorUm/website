<script lang="ts">
    import '$scss/components/messages-container.scss'
    import { page } from '$app/stores'
    import { Toast } from '$components'

	$: messages = $page.form?.messages ?? []
</script>

<div class="messages-container">
	{#each messages as message (message.id)}
		<Toast {...message} />
	{/each}
</div>