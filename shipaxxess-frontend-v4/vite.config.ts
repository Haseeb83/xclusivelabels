import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		chunkSizeWarningLimit: 20000,
		rollupOptions: {
		  output: {
			manualChunks(id) {
			  if (id.includes('node_modules')) {
				return id
				  .toString()
				  .split('node_modules/')[1]
				  .split('/')[0]
				  .toString();
			  }
			},
		  },
		},
	  },
	});
