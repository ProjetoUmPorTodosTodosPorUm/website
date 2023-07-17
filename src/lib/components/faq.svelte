<script lang="ts">
	import '$scss/components/faq.scss';
	import { onMount } from 'svelte';

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte';
	import FiChevronDown from 'svelte-icons-pack/fi/FiChevronDown';

	// i18n
	import { loadNamespaceAsync } from '$i18n/i18n-util.async';
	import LL, { setLocale } from '$i18n/i18n-svelte';
	$: i18n = $LL['faq'];

	export let locale: Locales;

	onMount(async () => {
		await loadNamespaceAsync(locale, 'faq');
		setLocale(locale);
	});

	function onQuestionToggle(event: Event) {
		// @ts-ignore
		const titleElem = event.currentTarget.parentNode;
		const answerElem = titleElem.querySelector('.answer');
		const iconElem = titleElem.querySelector('.icon');
		toggleQuestion(answerElem, iconElem);
	}

	function toggleQuestion(answerElem: HTMLDivElement, iconElem: SVGElement) {
		iconElem.classList.toggle('open');
		if (answerElem.style.maxHeight) {
			// @ts-ignore
			answerElem.style.maxHeight = null;
		} else {
			answerElem.style.maxHeight = `${answerElem.scrollHeight}px`;
		}
	}
</script>

<section id="faq">
	<h1>{i18n.headline()}</h1>

	<div class="questions">
		<div class="question-block">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<h2 class="question" on:click={onQuestionToggle}>
				Família Residente de Fora de Campo Missionário Pode Participar?
				<Icon src={FiChevronDown} className="icon" />
			</h2>
			<div class="answer">
				<p>
					Sim! Não havendo Campo estabelecido onde reside, o interessado se comprometendo em levar
					sua oferta ao POSTO DE COLETA, este pode se dirigir a Igreja responsável de um desses
					Campos e se inscrever como família Voluntária(Apoio Externo), ou preferindo envie-nos um
					e-mail para
					<a href="/como-participar#contato">contato@projetoumportodostodosporum.org</a> e aguarde o
					contato. Obrigada!
				</p>
			</div>
		</div>

		<div class="question-block">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<h2 class="question" on:click={onQuestionToggle}>
				Onde as Ofertas São Recebidas?
				<Icon src={FiChevronDown} className="icon" />
			</h2>
			<div class="answer">
				<dt><b>Na comunidade:</b></dt>
				<dd>
					Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de
					sua oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e a
					rua em que mora e colocar junto com a(s) oferta(s) na sacola para que o ADM possa atestar
					a entrega de sua oferta que deverá ser entregue no Posto de Coleta da Comunidade onde ela
					reside
				</dd>

				<dt><b>Nas Igrejas:</b></dt>
				<dd>
					Membro de Igreja inscrita no Projeto tem como atribuição o dever de observar as condições
					de sua oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e
					colocar junto com a(s) oferta(s) na sacola para que o ADM possa atestar a entrega de sua
					oferta que deverá ser entregue no Posto de Coleta onde congrega.
				</dd>

				<dt><b>Apoio Externo:</b></dt>
				<dd>
					Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de
					sua oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e as
					letras "A.E" e colocar junto com a oferta na sacola para que o ADM possa atestar a entrega
					de sua oferta que deverá ser entregue onde ficou estabelecido no ato da inscrição.
				</dd>
			</div>
		</div>

		<div class="question-block">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<h2 class="question" on:click={onQuestionToggle}>
				Que são ofertas extras?
				<Icon src={FiChevronDown} className="icon" />
			</h2>
			<div class="answer">
				<p>
					São assim designadas as ofertas trazidas além da oferta compromisso, oferta esta que a
					família Voluntária assume trazer ao "POSTO DE COLETA" no ato de sua inscrição; Também são
					chamadas ofertas extras aquelas ofertas cuja família voluntária não apresentou seu nº de
					inscrição, ou até por não ser inscrita.
				</p>
			</div>
		</div>
	</div>
</section>
