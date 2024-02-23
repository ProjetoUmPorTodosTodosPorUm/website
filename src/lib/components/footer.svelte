<script lang="ts">
	import '$scss/components/footer.scss';
	import { enhance } from '$app/forms'

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading';

	export let isSending = false

	function onSubmit() {
		isSending = true
	}
</script>

<section id="footer">
	<nav class="navigation">
		<ul class="nav-items">
			<li class="nav-item">
				<a href="/about-us">Quem Somos</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/about-us/meet-the-author">Conheça a Autora</a>
					</li>
					<li class="nav-sub-item">
						<a href="/about-us/talking-about-the-project">Falando Sobre o Projeto</a>
					</li>
					<li class="nav-sub-item">
						<a href="/about-us/services">Oferecemos</a>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/how-to-participate">Como Participar</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/how-to-participate/as-family">Como Família</a>
					</li>
					<li class="nav-sub-item">
						<a href="/how-to-participate/as-church">Como Igreja</a>
					</li>
					<li class="nav-sub-item">
						<a href="/how-to-participate/as-secular-institution">Como Instituição Secular</a>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a href="/fields">Campos Missionários</a>
				<ul class="nav-sub-items">
					<li class="nav-sub-item">
						<a href="/fields/collaborators">Colaboradores</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/welcomed-families">Famílias Acolhidas</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/offeror-families">Famílias Ofertantes</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/churches-in-unity">Igrejas em Unidade</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/collected-offers">Ofertas Coletadas</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/reports">Relatórios</a>
					</li>
					<li class="nav-sub-item">
						<a href="/fields/volunteers">Voluntários</a>
					</li>
				</ul>
			</li>
		</ul>
	</nav>
	<div class="contact">
		<h3>Entre em Contato</h3>
		<form 
			method="POST"
			action="?/contact"
			use:enhance
			on:submit={onSubmit}
		>
			<input
				name="name"	
				type="text"
				placeholder="Nome completo"
				required
				autoComplete="off"
			/>
			<input
				name="email"	
				type="email"
				placeholder="E-mail"
				required
				autoComplete="off"
			/>
			<textarea
				name="message"	
				placeholder="Sua mensagem"
				required
				autoComplete="off"
				minlength="20"
			/>
			<button on:click={onSubmit} type="submit">
				{#if isSending}
					<Icon src={AiOutlineLoading} className="icon" />
				{:else}
					Enviar Mensagem
				{/if}
			</button>
		</form>
	</div>
	<div class="info">
		<div class="text">© 2023 Projeto Um Por Todos! Todos Por Um.</div>
	</div>
</section>
