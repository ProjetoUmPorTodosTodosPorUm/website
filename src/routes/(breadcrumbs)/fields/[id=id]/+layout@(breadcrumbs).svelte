<script lang="ts">
	import { page } from '$app/stores'
	import type { FieldDto } from '$types'

	$: pageTitle = $page.data.pageTitle || ''
	$: field = $page.data.field as FieldDto
</script>

<h1>{pageTitle}</h1>
<h2>Campo Missionário - {field.designation}</h2>
<p class="sub-title no-text-indent">{field.abbreviation.toUpperCase()}</p>

<slot />
