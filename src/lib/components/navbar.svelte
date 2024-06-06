<script lang="ts">
	import '$scss/components/navbar.scss'
	import { PUBLIC_ASSETS_URL } from '$env/static/public'
	import { page } from '$app/stores'

	// icon
	import { Icon } from 'svelte-icons-pack'
	import { FiMenu } from 'svelte-icons-pack/fi'

	export let announcementsCount = 0

	$: isHomePage = $page.route.id == '/' ? true : false

	let navRef: HTMLElement
	let navToggleIconRef: HTMLDivElement
	let navResponsiveRef: HTMLDivElement

	function onNavToggle() {
		navResponsiveRef.classList.toggle('open')
		navToggleIconRef.classList.toggle('open')
		navRef.classList.toggle('open')
	}

	function isActive(url: URL, path: string) {
		return url.toString().indexOf(path) >= 0
	}
</script>

<nav bind:this={navRef} id="main-nav">
	<div class="wrap">
		{#if !isHomePage}
			<div class="nav-brand">
				<a href="/">
					<img src="{PUBLIC_ASSETS_URL}/images/logo.webp" alt={'Projeto "Um Por Todos! Todos Por Um."'} />
				</a>
			</div>
		{/if}

		<div bind:this={navToggleIconRef} class="nav-toggle-icon">
			<a href="#icon" on:click|preventDefault={onNavToggle}><Icon src={FiMenu} /></a>
		</div>

		<div bind:this={navResponsiveRef} class="nav-responsive">
			<ul class="nav-items">
				<li class="nav-item">
					<a class="nav-link" class:active={isActive($page.url, 'about-us')} href="/about-us">Quem Somos</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" class:active={isActive($page.url, 'how-to-participate')} href="/how-to-participate"
						>Como Participar</a
					>
				</li>
				<li class="nav-item">
					<a class="nav-link" class:active={isActive($page.url, 'fields')} href="/fields">Campos Missionários</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/#agenda-announcement">Avisos</a>
					{#if announcementsCount > 0}
						<div class="announcements-count">
							{announcementsCount}
						</div>
					{/if}
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#footer">Contato</a>
				</li>
			</ul>
		</div>
	</div>
</nav>
