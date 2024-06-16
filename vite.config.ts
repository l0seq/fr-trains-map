/** @type {import('vite').UserConfig} */
import { VitePluginRadar } from 'vite-plugin-radar'
export default {
   build: {
      assetsInlineLimit: 0,
   },
   plugins: [
      VitePluginRadar({
         plausible: {
            enabled: true,
            hostname: import.meta.env.PLAUSIBLE_DOMAIN,
            script: import.meta.env.PLAUSIBLE_SCRIPT
         }
      })
   ]
}