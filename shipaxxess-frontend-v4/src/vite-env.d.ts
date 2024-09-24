/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

interface ImportMetaEnv {
	readonly VITE_MODE: "dev" | "prod" | "test";
}
