export const wait = () =>
	new Promise((resolve) => {
		setTimeout(() => resolve(null), 50000);
	});
