import vituum from 'vituum'
import pug from '@vituum/vite-plugin-pug'
import postcss from '@vituum/vite-plugin-postcss'
import beautify from 'vite-plugin-beautify'
import stylelint from 'vite-plugin-stylelint'

// TODO https://github.com/evont/vite-plugin-spritesmith

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
      },
    },
  },
  plugins: [
    vituum({
      imports: {
        filenamePattern: {
          '+.css': [],
          '+.js': [],
          '+.scss': 'src/styles',
        },
      }
    }),
    pug({ root: './src' }),
    postcss(),
    beautify({ inDir: 'dist' }),
    stylelint()
  ],
  publicDir: 'static',
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
    },
  },
  optimizeDeps: {
    include: [
      // 'linked-dep-exemple'
    ],
  },
  build: {
    rollupOptions: {
      include: [
        // /linked-dep-exemple/,
        /node_modules/
      ],
      external: ['@vituum/core'],
      output: {
        dir: 'dist',
        entryFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.pug')) {
            // console.log("assetInfo", assetInfo)
            const jsModule = assetInfo.moduleIds.find((id) => id.endsWith('.js'))
            const cssModule = assetInfo.moduleIds.find((id) => id.endsWith('.css'))

            if (jsModule) {
              const jsModuleName = assetInfo.name.replace('.pug', '')
              return `assets/js/${jsModuleName}.js`
            }

            if (cssModule) {
              const cssModuleName = assetInfo.name.replace('.pug', '')
              return `assets/css/${cssModuleName}.css`
            }
          }
          return 'assets/js/[name].js'
        },
        chunkFileNames: 'assets/js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name].[ext]';
          } else if (assetInfo.name.endsWith('.js')) {
            return 'assets/js/[name].[ext]';
          } else if (assetInfo.name.endsWith('.jpg') || assetInfo.name.endsWith('.jpeg') || assetInfo.name.endsWith('.png') || assetInfo.name.endsWith('.svg') || assetInfo.name.endsWith('.webp')) {
            return 'assets/img/[name].[ext]';
          } else {
            return 'assets/[name].[ext]';
          }
        }
      }
    }
  }
}
