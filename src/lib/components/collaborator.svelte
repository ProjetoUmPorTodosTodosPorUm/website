<script lang="ts">
	import '$scss/components/collaborator.scss'
	import type { CollaboratorDto } from '../types'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	export let collaborator: CollaboratorDto
</script>

<div class="collaborator">
	<div class="image">
		<img
			src={collaborator.image
				? `${PUBLIC_FILES_URL}/${collaborator.image}`
				: 'https://placehold.co/160x90?text=Colaborador'}
			alt={collaborator.title}
		/>
	</div>
	<div class="content">
		<h4 class="title">{collaborator.title}</h4>
		<div class="text">{@html collaborator.description}</div>
	</div>
</div>
