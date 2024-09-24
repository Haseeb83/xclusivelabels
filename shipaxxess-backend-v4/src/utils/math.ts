export function generateSixDigitRandomNumber(): number {
	const min = 100000; // minimum value (inclusive)
	const max = 999999; // maximum value (inclusive)
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
