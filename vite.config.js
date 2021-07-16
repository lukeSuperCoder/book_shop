import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const baseUrl = {
  development: './',
  beta: './',
  release: './'
}
// https://vitejs.dev/config/
// export default defineConfig({
//   base: './',
//   plugins: [
//     vue()
//   ],
//   resolve: {
//     alias: {
//       '~': path.resolve(__dirname, './'),
//       '@': path.resolve(__dirname, 'src')
//     }
//   }
// })
export default ({ mode }) =>  defineConfig({
  plugins: [
    vue()
  ],
  base: baseUrl[mode],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  }
})

