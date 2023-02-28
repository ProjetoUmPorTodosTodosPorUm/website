<script lang="ts">
	import type { PageData } from './$types';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import MainNavbar from '$lib/components/public/navbar.svelte';
	import Footer from '$lib/components/public/footer.svelte';
	import { onMount } from 'svelte';
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import type { Namespaces } from '$i18n/i18n-types';

	export let data: PageData;

	const namespaces: Namespaces[] = ['components', 'routes'];

	onMount(async () => {
		await loadNamespaceAsync(data.locale, 'routes');
		await loadNamespaceAsync(data.locale, 'components');
		setLocale(data.locale);
	});
</script>

<MainNavbar locale={data.locale} />
<section id="main">
	<ul class="breadcrumb">
		<li><a href="/{data.locale}/">{$LL.breadcrumbs.home.text()}</a></li>
		<li>
			<a href="/{data.locale}/how-to-participate"
				>{$LL.breadcrumbs.home.howToParticipate.text()}</a
			>
		</li>
		<hr class="title-separator" />
	</ul>

	<h1>Como Participar</h1>

	<h2>Como Uma Família Pode Participar?</h2>
	<p>
		É muito simples participar. Verifique no link <a href="/{data.locale}#where-we-operate"
			>ONDE ATUAMOS</a
		>
		deste site se algum(s) do(s) Campo(s) Missionário(s) implantado(s) corresponde(m) ao local em que
		reside. Havendo basta se dirigir a Igreja resposável por este Campo e se inscrever como
		<i>Voluntário ofertante</i>
		escolhendo numa listagem que lhe será apresentada a sua oferta de compromisso. Também a mais a família
		ofertante poderá doar qualquer um dos
		<a href="/{data.locale}/how-to-participate#we-need">itens que estamos precisando.</a>
	</p>

	<p>
		No ato de sua inscrição a família voluntária ofertante deverá assinar um documento onde expressa
		o desejo de co-participar deste projeto, assumindo assim, a responsabilidade de assistir
		pessoa(s) ou família(s), inscritas no projeto <span class="special-font"
			>“Um por todos! Todos por um”.</span
		>
		Deverá receber um documento constando o nº de sua inscrição e nome de sua oferta combinada, e esta
		última poderá ser alterado a pedido dele próprio ou do administrativo do projeto. Veja no link
		<a href="/{data.locale}/onde-atuamos">ONDE ATUAMOS</a>
		o mapa do(s) Campo(s) Missionário(s) e descubra se mora em alguma das ruas de um desses Campos, se
		não veja o que segue abaixo<br />
	</p>

	<ul class="simple-ulist">
		<li>Detalhe</li>
		<li>Ao se inscrever, automaticamente você inscreve toda sua família.</li>
	</ul>

	<h2>Família Residente de Fora de Campo Missionário Pode Participar?</h2>
	<p>
		Sim! Não havendo Campo estabelecido onde reside, o interessado se comprometendo em levar sua
		oferta ao POSTO DE COLETA, este pode se dirigir a Igreja responsável de um desses Campos e se
		inscrever como família Voluntária(Apoio Externo), ou preferindo envie-nos um e-mail para
		<a href="/{data.locale}/how-to-participate#contact">contato@projetoumportodostodosporum.org</a> e
		aguarde o contato. Obrigada!
	</p>

	<h2>Ofertas e Seus Critérios</h2>
	<ul class="simple-ulist">
		<li>As ofertas serão recebidas nos "Postos de coleta"</li>
		<li>Na comunidade: Todo dia 10 de cada mês (no máximo dias 11 e 12).</li>
		<li>Nas Igrejas: Do dia 1º ao dia 12° de cada mês.</li>
		<li>ASSÍDUIDADE e QUALIDADE são fundamentais.</li>
	</ul>
	<ul class="simple-ulist">
		<li>Na comunidade</li>
		<li>
			Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de sua
			oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e a rua em que
			mora e colocar junto com a(s) oferta(s) na sacola para que o ADM possa atestar a entrega de
			sua oferta que deverá ser entregue no Posto de Coleta da Comunidade onde ela reside
		</li>
	</ul>
	<ul class="simple-ulist">
		<li>Nas Igrejas</li>
		<li>
			Membro de Igreja inscrita no Projeto tem como atribuição o dever de observar as condições de
			sua oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e colocar
			junto com a(s) oferta(s) na sacola para que o ADM possa atestar a entrega de sua oferta que
			deverá ser entregue no Posto de Coleta onde congrega.
		</li>
	</ul>
	<ul class="simple-ulist">
		<li>Apoio Externo</li>
		<li>
			Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de sua
			oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e as letras
			"A.E" e colocar junto com a oferta na sacola para que o ADM possa atestar a entrega de sua
			oferta que deverá ser entregue onde ficou estabelecido no ato da inscrição.
		</li>
	</ul>
	<ul class="simple-ulist">
		<li>Do recibo de entrega de ofertas</li>
		<li>
			A família Voluntária ofertante seja Comunitária, seja Eclesiástica ou Apoio Externo, poderá
			exigir do ADM "O recibo de entrega de oferta" no ato da entrega no "POSTO DE COLETA",
			principalmente no caso de ofertas extras que é o que mais recomendo que se peça.
		</li>
	</ul>
	<ul class="simple-ulist">
		<li>Que são ofertas extras?</li>
		<li>
			São assim designadas as ofertas trazidas além da oferta compromisso, oferta esta que a família
			Voluntária assume trazer ao "POSTO DE COLETA" no ato de sua inscrição; Também são chamadas
			ofertas extras aquelas ofertas cuja família voluntária não apresentou seu nº de inscrição, ou
			até por não ser inscrita.
		</li>
	</ul>
	<ul class="simple-ulist">
		<li>Observação</li>
		<li>
			As famílias assistidas receberão as ofertas (doações) coletadas todo dia 23 de cada mês.
		</li>
	</ul>
	<p>
		Meditemos amados nesta palavra...<br />
		<cite
			>"Ora, aquele que possuir recursos deste mundo, e vir seu irmão padecer necessidade, e
			fechar-lhe o coração, como pode permanecer nele o amor de Deus? Filhinhos, não amemos de
			palavra, nem de língua, mas de fato e de verdade." (1 João 3:17-18)</cite
		>
	</p>

	<h2 id="we-need">Estamos precisando</h2>
	<ul class="simple-ulist">
		<li>Discipuladores - Jovens e Adultos masculino e feminino - URGENTE!</li>
		<li>
			Membros de Igreja evangélica que queira ofertar 01 hora, 01 vez por semana para ensinar, orar
			e jejuar pela vida de alguém. Há pessoas que devido sua dificuldade em locomover-se poupam
			suas forças para estarem no culto
		</li>
	</ul>

	<ul class="simple-ulist">
		<li>Bíblias infantis e adultos<i>(tradução: João Ferreira de Almeida - revisada)</i></li>
		<li>Pode ser em bom estado não necessariamente novinha em folha.</li>
	</ul>

	<p>
		Para ofertar(doar) basta nos enviar um e-mail para contato@projetoumportodostodosporum.org com
		seu nome, endereço e telefone dizendo o que deseja ofertar. Se preferir ligue para
		(021)97002-8495, falar com Wilma. Desde já muitíssimo obrigada!
	</p>

	<h2 id="contact">Deseja participar? Envie-nos um e-mail!</h2>
	<!-- participate component-->
</section>
<Footer locale={data.locale} {namespaces} />

<style lang="scss">
	h1,
	h2 {
		margin: 0 0 1rem;
	}
</style>
