export function friendlyDateString(date: Date | string, hours = false, locales: Intl.LocalesArgument = 'pt-BR') {
	if (!(date instanceof Date)) {
		date = new Date(date)
	}

	if (hours) {
		return date.toLocaleDateString(locales, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		})
	} else {
		return date.toLocaleDateString(locales, {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}
}
