export function bytes2hex(bytes: Uint8Array) {
	return Array.prototype.map.call(bytes, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
}
