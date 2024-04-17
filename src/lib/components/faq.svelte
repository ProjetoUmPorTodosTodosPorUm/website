<script lang="ts">
	import '$scss/components/faq.scss'

	//icons
	import Icon from 'svelte-icons-pack/Icon.svelte'
	import FiChevronDown from 'svelte-icons-pack/fi/FiChevronDown'

	function onQuestionToggle(event: Event) {
		// @ts-ignore
		const titleElem = event.currentTarget.parentNode
		const answerElem = titleElem.querySelector('.answer')
		const iconElem = titleElem.querySelector('.icon')
		toggleQuestion(answerElem, iconElem)
	}

	function toggleQuestion(answerElem: HTMLDivElement, iconElem: SVGElement) {
		iconElem.classList.toggle('open')
		if (answerElem.style.maxHeight) {
			// @ts-ignore
			answerElem.style.maxHeight = null
		} else {
			answerElem.style.maxHeight = `${answerElem.scrollHeight}px`
		}
	}
</script>

<section id="faq">
	<div class="wrap">
		<h1>Perguntas Frequentes</h1>

		<div class="questions">
			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>O que uma determinada Igreja precisa fazer para poder utilizar-se desta NOVA Ferramenta Missionária?</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						Assistir aos <a
							target="_blank"
							href="https://www.youtube.com/playlist?list=PLaLszpCW39WOCGGp5NKGgWk3SpOi1wy81"
						>
							vídeos palestra no Canal WMCIA no YouTube</a
						>. Aqui no site da Ferramenta, buscar conhecer todas as páginas; e, feito isto, clicar no link:
						<a href="/how-to-participate/as-church-in-unity">“Como Participar” </a> então, acessar e imprimir três documentos
						para INSERÇÃO. O 1º documento “Bloco Hierárquico” até pode ser só visualizado para consulta, mas os dois últimos
						precisam ser impressos preenchidos, e enviados a autora em seu e-mail. Ela os analisará devendo então, esta Igreja
						aguardar o contato da autora que não deve ultrapassar de 30 dias a partir da data em que ela recebeu.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						O comerciante pode participar do Projeto “Um por todos! Todos por um”? E, de que forma o comerciante
						participa?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						Pode e deve, mas será inscrito como <a href="/how-to-participate/as-volunteer-family"
							>“Família Voluntária Ofertante - COMUNIDADE”</a
						>, e isto não impede esta família de ofertar com o que tem de melhor em seu comércio. Neste caso a Igreja
						responsável pelo Campo Missionário poderá postar anuncio deste comerciante, mas isto, entenda o comerciante
						será gentileza, e não obrigatório por parte de Igreja alguma.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						As “Casas de Recuperação” podem colaborar com o Projeto “Um por todos! Todos por um”? E, de que forma?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						É previsto que as Casas de Recuperação venham ser uma COLABORADORA do Projeto, tanto que há documentos
						específicos de inscrição para Instituições filantrópicas para que estas recebam das coletas de alimentos, e
						até de monetário. Em contra partida o Projeto nesta parceria contará com esta Instituição quando do
						evangelismo junto aos Moradores de Rua.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Quais as atribuições das Família Voluntárias Ofertantes – COMUNIDADE no Projeto “Um por todos! Todos por
						um”?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<h3>Da Conduta</h3>
					<ul>
						<li>QUALIDADE - Observar a condição de sua oferta. Pergunte-se: É o que eu gostaria de ganhar?</li>
						<li>
							ASSIDUIDADE – Anotar o nº de inscrição <b>[IG______S. A_______RUA______]</b> mais a rua em que reside,
							colocar junto com sua oferta na sacola e na <u>data oficial</u> de entrega de ofertas ao Projeto,
							<b>entregá-la no Posto de Coleta – COMUNIDADE</b> no Posto de Coleta ao qual ficou combinado quando do ato
							de sua inscrição. É de fundamental importância atentar para as anotações e local de entrega, pois a identificação
							pelo Adm. de qual Família pertence a oferta requer este cuidado.
						</li>
					</ul>

					<h3>Da Quantidade de Ofertas e Variedades</h3>
					<ul>
						<li>
							A Família Voluntária Ofertante poderá além da OFERTA DE COMPROMISSO (MENSAL) ofertar mais quantidades ou
							outros itens alimentícios <u>sempre não perecíveis</u> se desejar. Toda oferta além da oferta mensal é
							considerada <b>oferta - extra</b>, e assim será apresentada no site.
						</li>
						<li>
							Móveis, vestuário, utensílios e afins.... São solicitados <b
								>somente quando do surgimento de algum pedido</b
							> por parte de algum dos Acolhidos, pois não é critério do Projeto armazenar ofertas. E sim receber e passar...
						</li>
					</ul>

					<h3>Do Esquecimento de Ofertas</h3>
					<ul>
						<li>
							<b>No caso de esquecimento de entrega de oferta, esta deverá ser trazida no mês seguinte.</b> Os Postos de
							Coleta não é necessariamente um depósito, são residências ou Casa de Oração das vezes com pouco espaço.
							Mas... no caso de entregar sua oferta <b>após a data oficial de entrega</b> e sua(s) oferta(s) serão contadas
							juntamente com as ofertas extras.
						</li>
					</ul>

					<h3>Da Entrega de Ofertas em Posto de Coleta <b>Não Combinado</b></h3>
					<ul>
						<li>
							A entrega de oferta em POSTO DE COLETA não combinado resultará desta(s) oferta(s) ser contada entre as
							“ofertas extras”. A família Voluntária Ofertante deve ficar atenta ao <u>seu</u> Posto de Coleta de entrega.
						</li>
					</ul>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Quais as atribuições das Família Voluntárias Ofertantes – APOIO EXTERNO no Projeto “Um por todos! Todos por
						um”?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<h3>Da Conduta</h3>
					<ul>
						<li>QUALIDADE - Observar a condição de sua oferta. Pergunte-se: É o que eu gostaria de ganhar?</li>
						<li>
							ASSIDUIDADE – Anotar as iniciais A._E___, seguido do <u>nº de inscrição</u>, e colocar junto a sua oferta
							na sacola, e na <u>data oficial</u> de entrega de ofertas ao Projeto, entregá-la no Posto de Coleta combinado
							quando do ato de sua inscrição. É de fundamental importância atentar para as anotações, e local e data de entrega,
							pois a identificação pelo Adm. de qual Família pertence a oferta requer este cuidado.
						</li>
					</ul>

					<h3>Da Quantidade de Ofertas e Variedades</h3>
					<ul>
						<li>
							A Família Voluntária Ofertante – APOIO EXTERNO poderá além da OFERTA DE COMPROMISSO (MENSAL) ofertar mais
							quantidades ou outros itens alimentícios <u>sempre não perecíveis</u> se desejar. Toda oferta além da
							oferta mensal é considerada <u>oferta extra</u>, e assim será apresentada no site.
						</li>
						<li>
							<b>Móveis, vestuários, utensílios e afins...</b> serão solicitados somente quando do surgimento de algum
							pedido por parte de algum dos Assistidos, pois não temos depósito para armazenar este tipo de ofertas.
							<b>Agradecemos a compreensão.</b>
						</li>
					</ul>

					<h3>Do Esquecimento de Ofertas</h3>
					<ul>
						<li>
							<b>No caso de esquecimento de entrega de oferta, esta deverá ser trazida no mês seguinte.</b> Os Postos de
							Coleta não é necessariamente um depósito, são residências ou Casa de Oração das vezes com pouco espaço.
							Mas... no caso de entregar sua oferta <b>após a data oficial de entrega</b> e sua(s) oferta(s) serão contadas
							juntamente com as ofertas extras.
						</li>
					</ul>

					<h3>Da Entrega de Ofertas em Posto de Coleta <b>Não Combinado</b></h3>
					<ul>
						<li>
							A entrega de oferta em POSTO DE COLETA não combinado resultará desta(s) oferta(s) ser contada entre as
							“ofertas extras”. A família Voluntária Ofertante deve ficar atenta ao <u>seu</u> Posto de Coleta de entrega.
						</li>
					</ul>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						As Família Voluntárias Ofertantes – COMUNIDADE e APOIO EXTRA no Projeto “Um por todos! Todos por um” têm
						direito a recibo de sua(s) oferta(s)?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						É direito de <b>TODA</b> Família Vol. Ofertante, neste Projeto receber no ato de entrega de suas ofertas o
						RECIBO DE ENTREGA dessas ofertas atestando de que esta foi recebida pelo responsável no Posto de Coleta.
						Entendo ser desnecessário para as ofertas mensais devido haver um controle de ofertas, entretanto, no caso
						das
						<b>ofertas extras sugiro que solicite</b> ao Voluntário ADM responsável no Posto de coleta.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>Qual a data de entrega e apuração das ofertas?</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						A data de entregar poderá ser diferente de país para país. No Brasil foi esta data abaixo que firmei no
						período (7 anos) de minha Gestão. E esta data permanecerá para nova Gestão.
					</p>

					<h3>Entrega das Ofertas das Famílias Voluntárias Ofertantes</h3>
					<ul>
						<li>Igreja - Do dia 1 ao dia 12 de cada mês.</li>
						<li>Comunidade - Todo dia 10 de cada mês (máximo dias 11 e 12).</li>
					</ul>

					<h3>Contagem das Ofertas nos Postos de Coleta</h3>
					<ul>
						<li>Do dia 13 ao dia 18 (Inclusive as Igrejas).</li>
						<li>
							Do dia 19 ao dia 21. Procede-se a partilha das ofertas em sacolas na Igreja responsável entre as demais.
						</li>
					</ul>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						As Famílias Voluntárias Ofertantes, mais os Colaboradores podem visitar aos Acolhidos pelo Projeto “Um por
						todos! Todos por um”?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						Podem e serão bem vindos, mas precisam combinar com a Equipe Missionária, com certa antecedência. As visitas
						aos Acolhidos/Assistidos no Brasil período de minha Gestão, foi:
					</p>
					<ul>
						<li>
							Data: Todo dia 23 de cada mês Horário Previsto: 14h Local de Encontro: Verifique com a equipe Condição
							para visita: jejum e oração (recomenda-se duas horas antes de entrar em propósito)
						</li>
					</ul>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Porque no Projeto “Um por todos! Todos por um” precisa-se entregar as ofertas/doações alimentícias, em datas
						pré-estabelecidas?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						Porquê administrativamente falando isto trará êxito no sentido de se coletar mais, e assim, mais famílias
						serão beneficiadas. E, porque o Criador do Universo trabalha de forma ordenada, e como seus filhos devemos
						imitá-lo.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Tenho móveis, roupas, utensílios e afins, posso levar ao Posto de Coleta do Projeto “Um por todos! Todos por
						um” sem prévio aviso?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						<b>Não!</b> A pessoa que desejar abençoar esta Obra com estes tipos de ofertas/doações deve perguntar a Equipe
						de Vol. ADM, se há alguma das famílias necessitando deste tipo de ofertas. A intenção é muito louvável, porém,
						o Projeto trabalha no “recebo e entrego”, não tendo, e nem devendo ter depósitos.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Moro muito distante do Campo Missionário, mas sinto forte desejo em ofertar, acaso, o Projeto “Um por todos!
						Todo por um” recebe oferta em valor monetário?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						<b>Sim!</b> Na verdade, a oferta monetária jamais será solicitada em quaisquer dos Campos Missionários dos
						seis continentes, entretanto, <b>se espontâneo, pode sim</b>, o Projeto “Um por todos! Todo por um” receber
						em conta bancária única encontrada no site do Projeto, sob responsabilidade da Igreja SEDE. <b>Obs:</b>
						somente as Igreja SEDE em cada país terá conta bancária cabendo a ela repartir a benefício da Obra nos Campos
						Missionários de seu país.
					</p>
				</div>
			</div>

			<div class="question-block">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="question" on:click={onQuestionToggle}>
					<h2>
						Preciso ser inscrita no Projeto “Um por todos! Todo por um” para frequentar Eventos públicos promovidos pela
						Equipe Missionária deste?
					</h2>
					<Icon src={FiChevronDown} className="icon" />
				</div>
				<div class="answer">
					<p>
						Não! Sendo eventos públicos pode e deve participar. A equipe em muito se alegrará com a presença dos filhos
						de Deus. Veja na <a href="#agenda">“AGENDA”</a> deste site se há eventos e participe.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
