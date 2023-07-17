import type { NamespaceFooterTranslation } from '../../i18n-types'

const en_footer = {
	info: {
		project: 'Project One for All! All for one'
	},
	contact: {
		title: 'Contact Us',
		success: 'Message sent! Wait for the return.',
		nameInput: 'Full name',
		emailInput: 'Email',
		messageInput: 'Your message',
		sendButton: 'Send Message'
	},
	navigation: {
		aboutUs: {
			title: 'About Us',
			meetTheAuthor: 'Meet the Author',
			talkingAbout: 'Talking About the Project',
			services: 'We offer'
		},
		howToParticipate: {
			title: 'How to Participate',
			asFamily: 'As Family',
			asChurch: 'As Church',
			asInstitution: 'As Secular Institution'
		},
		fields: {
			title: 'Mission Fields',
			collaborators: 'Collaborators',
			welcomedFamilies: 'Welcoming Families',
			offerorFamilies: 'Offer Families',
			churchesInUnity: 'Churches in Unity',
			collectedOffers: 'Collected Offers',
			reports: 'Reports',
			volunteers: 'Volunteers'
		}
	}
} satisfies NamespaceFooterTranslation

export default en_footer
