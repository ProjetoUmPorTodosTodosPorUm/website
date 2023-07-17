import type { BaseTranslation } from '../../i18n-types';

const pt_BR_how_to_participate = {
    title: 'Como Participar',

    firstSection: {
        title: 'Como Uma Família Pode Participar?',
        firstParagraph: `É muito simples participar. Verifique no link <a href="/{locale:string}#where-we-operate">ONDE ATUAMOS</a>
        deste site se algum(s) do(s) Campo(s) Missionário(s) implantado(s) corresponde(m) ao local em que
        reside. Havendo basta se dirigir a Igreja resposável por este Campo e se inscrever como
        <i>Voluntário ofertante</i>
        escolhendo numa listagem que lhe será apresentada a sua oferta de compromisso. Também a mais a família
        ofertante poderá doar qualquer um dos
        <a href="/{locale:string}/how-to-participate#we-need">itens que estamos precisando.</a>`,
        secondParagraph: `No ato de sua inscrição a família voluntária ofertante deverá assinar um documento onde expressa
		o desejo de co-participar deste projeto, assumindo assim, a responsabilidade de assistir
		pessoa(s) ou família(s), inscritas no projeto <span class="project-font">“Um por todos! Todos por um”.</span>
		Deverá receber um documento constando o nº de sua inscrição e nome de sua oferta combinada, e esta
		última poderá ser alterado a pedido dele próprio ou do administrativo do projeto. Veja no link
		<a href="/{locale:string}/onde-atuamos">ONDE ATUAMOS</a>
		o mapa do(s) Campo(s) Missionário(s) e descubra se mora em alguma das ruas de um desses Campos, se
		não veja o que segue abaixo`,
        observation: '<span class="font-weight-bold">Detalhe</span>: Ao se inscrever, automaticamente você inscreve toda sua família.'
    },

    secondSection: {
        title: 'Família Residente de Fora de Campo Missionário Pode Participar?',
        firstParagraph: `Sim! Não havendo Campo estabelecido onde reside, o interessado se comprometendo em levar sua
		oferta ao POSTO DE COLETA, este pode se dirigir a Igreja responsável de um desses Campos e se
		inscrever como família Voluntária(Apoio Externo), ou preferindo envie-nos um e-mail para
		<a href="/{locale:string}/how-to-participate#contact">contato@projetoumportodostodosporum.org</a> e
		aguarde o contato. Obrigada!`
    },

    thirdSection: {
        title: 'Ofertas e Seus Critérios',
        offerCriteria: [
            'As ofertas serão recebidas nos "Postos de coleta"',
            'Na comunidade: Todo dia 10 de cada mês (no máximo dias 11 e 12).',
            'Nas Igrejas: Do dia 1º ao dia 12° de cada mês.',
            'ASSÍDUIDADE e QUALIDADE são fundamentais.'
        ],
        community: {
            subTitle: 'Na comunidade',
            text: `Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de sua
			oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e a rua em que
			mora e colocar junto com a(s) oferta(s) na sacola para que o ADM possa atestar a entrega de
			sua oferta que deverá ser entregue no Posto de Coleta da Comunidade onde ela reside`
        },
        church: {
            subTitle: 'Nas Igrejas',
            text: `Membro de Igreja inscrita no Projeto tem como atribuição o dever de observar as condições de
			sua oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e colocar
			junto com a(s) oferta(s) na sacola para que o ADM possa atestar a entrega de sua oferta que
			deverá ser entregue no Posto de Coleta onde congrega.`,
        },
        external: {
            subTitle: 'Apoio Externo',
            text: `Cada família Voluntária ofertante tem como atribuição o dever de observar as condições de sua
			oferta compromisso e se tiver ofertas extras também, anotar seu nº de inscrição e as letras
			"A.E" e colocar junto com a oferta na sacola para que o ADM possa atestar a entrega de sua
			oferta que deverá ser entregue onde ficou estabelecido no ato da inscrição.`
        },
        offerReceipt: {
            subTitle: 'Do recibo de entrega das ofertas',
            text: `A família Voluntária ofertante seja Comunitária, seja Eclesiástica ou Apoio Externo, poderá
			exigir do ADM "O recibo de entrega de oferta" no ato da entrega no "POSTO DE COLETA",
			principalmente no caso de ofertas extras que é o que mais recomendo que se peça.`
        },
        extraOffers: {
            subTitle: 'Que são ofertas extras?',
            text: `São assim designadas as ofertas trazidas além da oferta compromisso, oferta esta que a família
			Voluntária assume trazer ao "POSTO DE COLETA" no ato de sua inscrição; Também são chamadas
			ofertas extras aquelas ofertas cuja família voluntária não apresentou seu nº de inscrição, ou
			até por não ser inscrita.`
        },
        observation: {
            subTitle: 'Observação',
            text: 'As famílias assistidas receberão as ofertas (doações) coletadas todo dia 23 de cada mês.'
        },

        footnote: `"Ora, aquele que possuir recursos deste mundo, e vir seu irmão padecer necessidade, e
        fechar-lhe o coração, como pode permanecer nele o amor de Deus? Filhinhos, não amemos de
        palavra, nem de língua, mas de fato e de verdade." (1 João 3:17-18)`
    },

    fourthSection: {
        title: 'Estamos precisando',
        disciplers: {
            subTitle: 'Discipuladores - Jovens e Adultos masculino e feminino - URGENTE!',
            text: `Membros de Igreja evangélica que queira ofertar 01 hora, 01 vez por semana para ensinar, orar
			e jejuar pela vida de alguém. Há pessoas que devido sua dificuldade em locomover-se poupam
			suas forças para estarem no culto`
        },
        bibles: {
            subTitle: 'Bíblias infantis e adultos <i>(tradução: João Ferreira de Almeida - revisada)</i>',
            text: 'Pode ser em bom estado não necessariamente novinha em folha.'
        },
        note: `Para ofertar (doar) basta nos enviar um e-mail para contato@projetoumportodostodosporum.org com
		seu nome, endereço e telefone dizendo o que deseja ofertar. Se preferir ligue para
		(21)97002-8495, falar com Wilma. Desde já muitíssimo obrigada!`
    }
} as BaseTranslation

export default pt_BR_how_to_participate