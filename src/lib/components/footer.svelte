<script lang="ts">
	import '$scss/components/footer.scss'
	import { enhance } from '$app/forms'
	import { SwitchTheme } from '$components'
	import { PUBLIC_CMS_URL } from '$env/static/public'

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import AiOutlineLoading from 'svelte-icons-pack/ai/AiOutlineLoading'

	export let isSendingContact = false

	function onSubmit() {
		isSendingContact = true
	}
</script>

<section id="footer">
	<div class="wrap">
		<nav class="navigation">
			<ul class="nav-items">
				<li class="nav-item">
					<a href="/about-us">Quem Somos</a>
					<ul class="nav-sub-items">
						<li class="nav-sub-item">
							<a href="/about-us/meet-the-author">Conheça a Autora</a>
						</li>
						<li class="nav-sub-item">
							<a href="/about-us/authors-credentials">Credenciais da Autora</a>
						</li>
						<li class="nav-sub-item">
							<a href="/about-us/talking-about-the-project">Falando Sobre o Projeto</a>
						</li>
						<li class="nav-sub-item">
							<a href="/about-us/services">Oferecemos às Famílias</a>
						</li>
						<li class="nav-sub-item">
							<a href="/about-us/authors-management">Gestão da Autora</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="/how-to-participate">Como Participar</a>
					<ul class="nav-sub-items">
						<li class="nav-sub-item">
							<a href="/how-to-participate/as-volunteer-family">Como Família Voluntária</a>
						</li>
						<li class="nav-sub-item">
							<a href="/how-to-participate/as-church-in-unity">Como Igreja em Unidade</a>
						</li>
						<li class="nav-sub-item">
							<a href="/how-to-participate/as-recovery-house">Como Casa de Recuperação</a>
						</li>
						<li class="nav-sub-item">
							<a href="/how-to-participate/as-autonomous-collaborator">Como Colaborador Autônomo</a>
						</li>
						<li class="nav-sub-item">
							<a href="/how-to-participate/administrative-documents">Documentos Administrativos</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="/fields">Campos Missionários</a>
					<ul class="nav-sub-items">
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
							<a href="/fields/volunteers">Voluntários Administrativos</a>
						</li>
						<li class="nav-sub-item">
							<a href="/fields/collaborators">Colaboradores</a>
						</li>
						<li class="nav-sub-item">
							<a href="/fields/recovery-houses">Casas de Recuperação</a>
						</li>

						<li class="nav-sub-item">
							<a href="/fields/collected-offers">Ofertas Coletadas</a>
						</li>
						<li class="nav-sub-item">
							<a href="/fields/reports">Relatórios</a>
						</li>
					</ul>
				</li>
			</ul>
		</nav>
		<div class="contact">
			<h3>Entre em Contato</h3>
			<form method="POST" action="?/contact" use:enhance on:submit={onSubmit}>
				<input name="name" type="text" placeholder="Nome Completo" autocomplete="name" />
				<input name="email" type="email" placeholder="E-mail" autocomplete="email" />
				<textarea name="message" placeholder="Sua mensagem" autocomplete="off" />
				<button on:click={onSubmit} type="submit">
					{#if isSendingContact}
						<Icon src={AiOutlineLoading} className="icon" color="var(--dominant)" />
					{:else}
						Enviar Mensagem
					{/if}
				</button>
			</form>
		</div>
		<div class="info">
			<SwitchTheme />
			<div class="text">
				<div class="line">© 2024 Projeto "Um Por Todos! Todos Por Um" | <a href={PUBLIC_CMS_URL}>Painel</a></div>
				<div class="line">
					Orgulhosamente feito por <a href="https://github.com/RenanGalvao" target="_blank">@RenanGalvão</a>
				</div>
			</div>
		</div>
	</div>
</section>
