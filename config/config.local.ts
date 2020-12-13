import { defineConfig } from 'umi'


export default defineConfig({
  proxy: {
    '/apps': {
      target: 'http://127.0.0.1:4040',
      changeOrigin: true,
    },
  },
})
