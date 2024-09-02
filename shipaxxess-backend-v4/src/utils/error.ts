export const exception = (params: { message: string; code: number }) => {
	return new Error(JSON.stringify(params));
};
