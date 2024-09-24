export const girth = (packages: number[]): number => {
	const [num1, num2, num3] = packages.sort((a, b) => a - b);
	return (num1 + num2) * 2 + num3;
};
