<script lang="ts">
	import { Navbar, Breadcrumbs, Footer } from '$components'
</script>

<Navbar />
<section id="main">
	<Breadcrumbs  />
	<slot />
</section>
<Footer/>
