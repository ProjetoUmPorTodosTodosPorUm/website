import type { BaseTranslation } from '../../i18n-types';

const shared = {
    subTitle: 'Campo Missionário - {designation:string}',
    backButton: 'Voltar',
    month: 'Mês',
    year: 'Ano',
};

const pt_BR_fields = {
    title: 'Campos Missionários',
    pages: 'Páginas',
    

    churchesInUnity: {
        title: 'Igrejas em Unidade',
        subTitle: shared.subTitle,
    },

    collaborators: {
        title: 'Colaboradores',
        subTitle: shared.subTitle,
    },

    collectedOffers: {
        title: 'Ofertas Coletadas',
        subTitle: shared.subTitle,
        monthlyOption: 'Mensal',
        annualOption: 'Anual',

        foodGraph: {
            title: 'Alimentos Recolhidos',
            text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by English versions from the
            1914 translation by H. Rackham.`
        },

        monetaryGraph: {
            title: 'Recursos Recolhidos',
            text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by English versions from the
            1914 translation by H. Rackham.`
        },

        othersGraph: {
            title: 'Outros',
            text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
            are also reproduced in their exact original form, accompanied by English versions from the
            1914 translation by H. Rackham.`
        },

        annualObservation: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

        monthlyObservation: `It is a long established fact that a reader will be distracted by the readable content of a
        page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here, content
        here', making it look like readable English. Many desktop publishing packages and web page
        editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
        uncover many web sites still in their infancy. Various versions have evolved over the years,
        sometimes by accident, sometimes on purpose (injected humour and the like).`

    },

    offerorFamilies: {
        title: 'Famílias Ofertantes',
        subTitle: shared.subTitle,
        searchPlaceholder: 'Pesquise pelo representante da família',
        specificOption: 'Pesquisar Por Campo Missionário',
        allOption: 'Pesquisar em Todos os Campos Missionários',

        commitment: 'Compromisso',
        group: 'Grupo',
        churchDenomination: 'Igreja',

        backButton: shared.backButton
    },

    reports: {
        title: 'Relatórios',
        subTitle: shared.subTitle,

        month: shared.month,
        year: shared.year,
        posted: 'Postado em ',

        monthly: 'Mensal',
        semester: 'Semestral',
        annual: 'Anual'
    },

    volunteers: {
        title: 'Voluntários',
        subTitle: shared.subTitle,

        firstSection: 'Setor Operacional de Missões',
        secondSection: 'Serviço Interno e Externo',
        thirdSection: 'Serviço de Apoio',
        joinedDate: 'Data de Entrada'
    },

    welcomedFamilies: {
        title: 'Famílias Acolhidas',
        subTitle: shared.subTitle,

        representative: 'Representante',
        observation: 'Observação'
    }

} as BaseTranslation

export default pt_BR_fields;