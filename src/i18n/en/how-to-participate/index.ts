import type { NamespaceHowToParticipateTranslation } from '../../i18n-types'

const en_how_to_participate = {
	title: 'How to Participate',

	firstSection: {
		title: 'How Can a Family Participate?',
		firstParagraph: `It's very simple to participate. Check the link <a href="/{locale:string}#where-we-operate">WHERE WE OPERATE</a>
         of this site if any of the Mission Field(s) implanted(s) correspond(s) to the place where
         resides. If there is, it is enough to go to the Church responsible for this Field and register as
         <i>Offer volunteer</i>
         choosing from a list that will present you with your compromise offer. Also the family
         offeror may donate any of the
         <a href="/{locale}/how-to-participate#we-need">items we need.</a>`,
		secondParagraph: `At the time of registration, the offering volunteer family must sign a document expressing
the desire to co-participate in this project, thus assuming the responsibility of assisting
person(s) or family(ies), enrolled in the project <span class="project-font">“One for all! All for one.”</span>
You should receive a document containing your registration number and the name of your combined offer, and this
the latter may be changed at his own request or by the project administrator. See the link
<a href="/{locale}/where-we-work">WHERE WE WORK</a>
the map of the Mission Field(s) and find out if you live on any of the streets in one of these Fields, if
don't see what follows below`,
		observation: '<span class="font-weight-bold">Details</span>: When you sign up, you automatically sign up your whole family.'
	},

	secondSection: {
		title: 'Can Families Resident Outside the Mission Field Participate?',
		firstParagraph: `Yes! If there is no established Field where he resides, the interested party undertakes to take his
offer to the COLLECTION OFFICE, this can go to the responsible Church of one of these Camps and if
sign up as a Volunteer family (External Support), or if you prefer, send us an email to
<a href="/{locale}/how-to-participate#contact">contato@projetoumportodostodosporum.org</a> and
wait for contact. Thank you!`
	},

	thirdSection: {
		title: 'Offers and Their Criteria',
		offerCriteria: [
			'Offers will be received at the "Collection Points"',
			'In the community: Every 10th of each month (maximum 11th and 12th).',
			'In Churches: From the 1st to the 12th of each month.',
			'ATTENDANCE and QUALITY are essential.'
		],
		community: {
			subTitle: 'In the community',
			text: `Each Volunteer offering family has the duty to observe the conditions of its
commitment offer and if you have extra offers as well, write down your registration number and the street on which
and put it together with the offer(s) in the bag so that the ADM can certify the delivery of
her gift, which must be delivered to the Collection Point in the Community where she resides`
		},
		church: {
			subTitle: 'In Churches',
			text: `A member of the Church enrolled in the Project has the duty to observe the conditions of
your commitment offer and if you have extra offers as well, write down your registration number and put
together with the offer(s) in the bag so that the ADM can certify the delivery of his offer that
must be delivered to the Collection Point where it congregates.`,
		},
		external: {
			subTitle: 'External Support',
			text: `Each Volunteer offering family has the duty to observe the conditions of its
commitment offer and if you have extra offers as well, write down your registration number and the letters
"A.E" and put it together with the offer in the bag so that the ADM can certify the delivery of his
offer that must be delivered where it was established in the act of registration.`
		},
		offerReceipt: {
			subTitle: 'Of the delivery receipt of offers',
			text: `The offering Volunteer family, whether Community, Ecclesiastical or External Support, may
demand from the ADM "The offer delivery receipt" upon delivery at the "COLLECTION OFFICE",
especially in the case of extra offers, which is what I most recommend asking for.`
		},
		extraOffers: {
			subTitle: 'What are extra offers?',
			text: `This is the name given to the offerings brought in addition to the commitment offering, an offering that the family
Volunteer assumes to bring to the "POSTO DE COLLECTION" in the act of registration; are also called
extra offers those offers whose volunteer family did not present their registration number, or
even for not being registered.`
		},
		observation: {
			subTitle: 'Observation',
			text: 'Assisted families will receive the offerings (donations) collected every 23rd of each month.'
		},

		footnote: `"Now whoever has this world's goods, and sees his brother in need, and
         close your heart, how can the love of God remain in it? Little children, let us not love
         word, nor tongue, but in deed and truth." (1 John 3:17-18)`
	},

	fourthSection: {
		title: 'We are in need',
		disciplers: {
			subTitle: 'Discipulators - Male and female Youth and Adults - URGENT!',
			text: `Members of an evangelical church who want to offer 01 hour, 01 time a week to teach, pray
and fasting for someone's life. There are people who, due to their difficulty in moving around, save
their strength to be in worship`
		},
		bibles: {
			subTitle: "Children's and adult Bibles<i>(translation: João Ferreira de Almeida - revised)< /i>",
			text: 'May be in good condition not necessarily brand new.'
		},
		note: `To offer (donate) just send us an email to contato@projetoumportodostodosporum.org with
your name, address and telephone number saying what you want to offer. If you prefer call
(21) 97002-8495, talk to Wilma. Thank you very much in advance!`
	}

} satisfies NamespaceHowToParticipateTranslation

export default en_how_to_participate
