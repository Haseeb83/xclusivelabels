export const log = (message: string) => {
	console.log(JSON.stringify({ message, time: Date.now() }));
};
