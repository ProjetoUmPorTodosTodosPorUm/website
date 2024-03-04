<script lang="ts">
	import type { PageData } from './$types'
	import type { OfferorFamilyDto } from '$types'
	import { SearchOfferorFamily } from '$components'

	export let data: PageData
	$: offerorFamilyData = data.apiData as OfferorFamilyDto[]
	$: totalPages = data.totalPages
	$: totalCount = data.totalCount
</script>

<SearchOfferorFamily offerorFamilies={offerorFamilyData} {totalPages} {totalCount} />
