<script lang="ts">
	import '$scss/routes/fields/oferror-families.scss'
	import type { PageData } from './$types'
	import type { OfferorFamilyDto } from '$types'

	import { SearchOfferorFamily } from '$components'

	export let data: PageData

	$: offerorFamilyData = data.apiData as OfferorFamilyDto[]
	$: totalCount = data.totalCount
	$: totalPages = data.totalPages
</script>

<h1>Famílias Ofertantes</h1>
<div class="reset-option">
	<button><a href="/fields/offeror-families">Voltar</a></button>
</div>

<SearchOfferorFamily offerorFamilies={offerorFamilyData} {totalPages} {totalCount} />
