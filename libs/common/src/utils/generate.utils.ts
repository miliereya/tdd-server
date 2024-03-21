export function generateSixDigitsCode() {
	return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
}

const rand = () => {
	return Math.random().toString(36).substr(2)
}

export const generateConfirmationToken = () => {
	return rand() + rand() + rand() + rand()
}
