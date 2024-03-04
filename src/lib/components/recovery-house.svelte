<script lang="ts">
	import '$scss/components/recovery-house.scss'
	import type { RecoveryHouseDto } from '../types'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	export let recoveryHouse: RecoveryHouseDto
</script>

<div class="recovery-house">
	<div class="image">
		<img
			src={recoveryHouse.image
				? `${PUBLIC_FILES_URL}/${recoveryHouse.image}`
				: 'https://placehold.co/160x90?text=Casa+de+Recuperação'}
			alt={recoveryHouse.title}
		/>
	</div>
	<div class="content">
		<h4 class="title">{recoveryHouse.title}</h4>
		<div class="text">{@html recoveryHouse.description}</div>
	</div>
</div>
