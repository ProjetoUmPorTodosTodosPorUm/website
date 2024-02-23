<script lang="ts">
	import '$scss/components/navbar.scss';
	import logo from '$assets/images/logo.png'

	// icon
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiMenu from 'svelte-icons-pack/fi/FiMenu';

	let navRef: HTMLElement;
	let navToggleIconRef: HTMLDivElement;
	let navResponsiveRef: HTMLDivElement;

	function onNavToggle() {
		navResponsiveRef.classList.toggle('open');
		navToggleIconRef.classList.toggle('open');
		navRef.classList.toggle('open');
	}

	function onLinkClick(sectionId: string) {
		const animationTime = 300; // ms
		navResponsiveRef.classList.remove('open');

		setTimeout(() => {
			const navbarHeight = navRef.offsetHeight;
			const sectionRef: HTMLDivElement | null = document.querySelector(sectionId);

			if (sectionRef) {
				window.scrollTo({ top: sectionRef.offsetTop - navbarHeight, behavior: 'smooth' });
			}
		}, animationTime);
	}
</script>

<nav bind:this={navRef} id="main-nav">
	<div class="nav-brand">
		<a href="/" on:click|preventDefault={() => onLinkClick('#landing')}>
			<img src={logo} alt="Logo" />
		</a>
	</div>

	<div bind:this={navToggleIconRef} class="nav-toggle-icon">
		<a href="#icon" on:click={onNavToggle}><Icon src={FiMenu} /></a>
	</div>

	<div bind:this={navResponsiveRef} class="nav-responsive">
		<ul class="nav-items">
			<li class="nav-item">
				<a href="/about-us">Quem Somos</a>
			</li>
			<li class="nav-item">
				<a href="#how-to-participate" on:click|preventDefault={() => onLinkClick('#how-to-participate')}>Como Participar</a>
			</li>
			<li class="nav-item">
				<a href="/fields">Campos Missionários</a>
			</li>
			<li class="nav-item">
				<a href="#agenda-announcement" on:click|preventDefault={() => onLinkClick('#agenda-announcement')}>Avisos</a>
			</li>
			<li class="nav-item">
				<a href="#footer" on:click|preventDefault={() => onLinkClick('#footer')}>Contato</a>
			</li>
		</ul>
	</div>
</nav>
