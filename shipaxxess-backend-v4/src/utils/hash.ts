export const hash = async (txt: string) => {
	const myDigest = await crypto.subtle.digest(
		{
			name: "SHA-256",
		},
		new TextEncoder().encode(txt),
	);

	return new Uint8Array(myDigest).reduce((a, b) => a + b.toString(16).padStart(2, "0"), "");
};
