<script lang="ts">
	import '$scss/routes/fields/collected-offers.scss';
	import type { PageData } from './$types';
	import type { FieldDto } from '$types';

	export let data: PageData
	$: field = data.field as FieldDto
</script>

<div class="option-container">
	<button class="option"><a href={`/fields/${field.id}/collected-offers/monthly`}>Mensal</a></button>
	<button class="option"><a href={`/fields/${field.id}/collected-offers/annual`}>Anual</a></button>
</div>
