import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import path from "path";

// https://vitejs.dev/config/
export default ({mode}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  return defineConfig({
    resolve:{
      alias:{
        "@":path.resolve(__dirname,"src")
      }
    },
    plugins: [
      vue({template: { transformAssetUrls}}),
      quasar({
        sassVariables: 'src/quasar-variables.sass'
      })
    ],
  })
}
