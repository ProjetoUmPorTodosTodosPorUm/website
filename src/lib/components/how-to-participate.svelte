<script lang="ts">
	import { enhance } from '$app/forms'
	import '$scss/components/how-to-participate.scss'

	//icons
	import { Icon } from 'svelte-icons-pack'
	import { AiOutlineLoading } from 'svelte-icons-pack/ai'

	export let isSendingParticipate = false
	let spinnerColor = 'var(--dominant)'

	function onSubmit() {
		isSendingParticipate = true
	}

	function isMouseOver(node: HTMLElement) {
		node.onmouseover = (ev) => {
			spinnerColor = 'var(--accent)'
		}
		node.onmouseleave = (ev) => {
			spinnerColor = 'var(--dominant)'
		}
	}
</script>

<section id="how-to-participate">
	<div id="how-to-participate-form" class="form">
		<h2>Você quer participar? Entraremos em contato!</h2>
		<form method="POST" action="?/contactParticipate" use:enhance on:submit={onSubmit}>
			<input type="text" name="name" placeholder="Nome" autocomplete="name" />
			<input type="email" name="email" placeholder="E-mail" autocomplete="email" />

			<button type="submit" use:isMouseOver>
				{#if isSendingParticipate}
					<Icon src={AiOutlineLoading} className="icon" color={spinnerColor} />
				{:else}
					Quero Participar do Projeto!
				{/if}
			</button>
		</form>
	</div>
	<div class="text">
		<h1 class="headline">Como uma família pode participar?</h1>
		<p>
			É muito simples participar. Verifique neste site se algum(s) do(s) Campo(s) Missionário(s) implantado(s) 
			corresponde(m) ao local em que reside. Havendo basta se dirigir a Igreja responsável por este Campo e se 
			inscrever como <i>Voluntário ofertante</i> escolhendo numa listagem que lhe será apresentada a sua oferta 
			de compromisso. Também a família ofertante poderá doar a mais qualquer um dos itens da lista de oferta.
		</p>

		<p>
			No ato de sua inscrição a família voluntária ofertante deverá assinar um documento onde expressa o desejo de
			co-participar deste projeto, assumindo assim, a responsabilidade de assistir pessoa(s) ou família(s), inscritas no
			projeto “Um por todos! Todos por um”. Deverá receber um documento constando o nº de sua inscrição e nome de 
			sua oferta combinada, e esta última poderá ser alterado a pedido dele próprio ou do administrativo do projeto.
		</p>
	</div>
</section>
