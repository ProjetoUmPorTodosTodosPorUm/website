<script lang="ts">
	import { Navbar, Breadcrumbs } from '$components'
</script>

<Navbar />
<section id="main">
	<Breadcrumbs />
	<slot />
</section>
