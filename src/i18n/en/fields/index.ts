import type { NamespaceFieldsTranslation } from '../../i18n-types'

const shared = {
	subTitle: 'Mission Field - {designation}',
	backButton: 'Back',
	month: 'Month',
	year: 'Year',
};

const en_fields = {
	title: 'Mission Fields',
	pages: 'Pages',


	churchesInUnity: {
		title: 'Churches in Unity',
		subTitle: shared.subTitle,
	},

	collaborators: {
		title: 'Collaborators',
		subTitle: shared.subTitle,
	},

	collectedOffers: {
		title: 'Collected Offers',
		subTitle: shared.subTitle,
		monthlyOption: 'Monthly',
		annualOption: 'Annual',

		foodGraph: {
			title: 'Gathered Food',
			text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
             interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
             are also reproduced in their exact original form, accompanied by English versions from the
             1914 translation by H. Rackham.`
		},

		monetaryGraph: {
			title: 'Resources Collected',
			text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
             interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
             are also reproduced in their exact original form, accompanied by English versions from the
             1914 translation by H. Rackham.`
		},

		othersGraph: {
			title: 'Other',
			text: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
             interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero
             are also reproduced in their exact original form, accompanied by English versions from the
             1914 translation by H. Rackham.`
		},

		annualObservation: `
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequent. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
         non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,

		monthlyObservation: `It is a long established fact that a reader will be distracted by the readable content of a
         page when looking at its layout. The point of using Lorem Ipsum is that it has a
         more-or-less normal distribution of letters, as opposed to using 'Content here, content
         here', making it look like readable English. Many desktop publishing packages and web page
         editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
         discover many web sites still in their infancy. Various versions have evolved over the years,
         sometimes by accident, sometimes on purpose (injected humor and the like).`

	},

	offerorFamilies: {
		title: 'Offering Families',
		subTitle: shared.subTitle,
		searchPlaceholder: 'Search by family representative',
		specificOption: 'Search by Mission Field',
		allOption: 'Search All Mission Fields',

		commitment: 'Commitment',
		group: 'Group',
		churchDenomination: 'Church',

		backButton: shared.backButton
	},

	reports: {
		title: 'Reports',
		subTitle: shared.subTitle,

		month: shared.month,
		year: shared.year,
		posted: 'Posted on ',

		monthly: 'Monthly',
		semester: 'Semi-annual',
		annual: 'Annual'
	},

	volunteers: {
		title: 'Volunteers',
		subTitle: shared.subTitle,

		firstSection: 'Mission Operational Sector',
		secondSection: 'Internal and External Service',
		thirdSection: 'Support Service',
		joinedDate: 'Joined Date'
	},

	welcomedFamilies: {
		title: 'Welcomed Families',
		subTitle: shared.subTitle,

		representative: 'Representative',
		observation: 'Observation'
	}

} satisfies NamespaceFieldsTranslation

export default en_fields
