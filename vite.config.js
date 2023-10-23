import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'                              // 开启gizp压缩

import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'            // 自动按需引入组件
import AutoImport from 'unplugin-auto-import/vite'                                 // 自动导入
import { visualizer } from 'rollup-plugin-visualizer'                              // 生成build分析页面(stats.html)
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import ElementPlus from 'unplugin-element-plus/vite'


function resolve(dir) {
  return path.join(__dirname, dir)
}
export default defineConfig(({ command, mode }) => {
  return {
    base: '/', // 公共基础路径
    plugins: [
      vue({
        include: [/\.vue$/]
      }),
      ElementPlus(),
      visualizer(),
      viteCompression(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
        directoryAsNamespace: true
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'vuex'],
        resolvers: [ElementPlusResolver({
          importStyle: 'sass'
        })],
      })
    ],
    server: {
      open: false,
      port: 8081,
      host: '0.0.0.0',
      proxy: {
        '/dev-api': {
          // target: 'http://192.168.1.10:8091/',
          target: 'http://192.168.1.5:8091/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ''),
        }
      }
    },
    resolve: {
      // 设置文件快捷路径
      alias: {
        '@': resolve('src')
      }
    },
    css: {
      preprocessorOptions: {
        // 加载全局less
      }
    },
    build: {
      minify: 'esbuild',                       // 默认
      chunkSizeWarningLimit: 4000              // 消除打包大小超过500kb警告
    },
    esbuild: {
      drop: command === 'build' ? ['console', 'debugger'] : []
    }
  }
})
