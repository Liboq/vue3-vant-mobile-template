import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { createHtmlPlugin } from "vite-plugin-html";
import { resolve } from "path";
import { VantResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
const pathResolve = (dir: string) => resolve(__dirname, dir);

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const env: Partial<ImportMetaEnv> = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin(),
      Components({
        resolvers: [VantResolver({ importStyle: false })],
      }),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-import.d.ts",
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    define: {
      "process.env": env,
    },
    resolve: {
      // 这里的alias是路径别名，是运行阶段的替换路径，而tsconfig.json中的paths是编码阶段的提示，
      alias: {
        "@": pathResolve("src"), // path.resolve中，'./src' 等于 'src'
        // '@router': pathResolve('src/router'),
      },
    },
    build: {
      outDir: "dist", // 指定打包路径，默认为项目根目录下的 dist 目录
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      // minify默认esbuild，esbuild模式下terserOptions将失效
      // vite3变化：Terser 现在是一个可选依赖，如果你使用的是 build.minify: 'terser'，你需要手动安装它 `npm add -D terser`
      minify: "terser",
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: env.VITE_BUILD_DROP_CONSOLE === "true", // 去除 console
          drop_debugger: true, // 去除 debugger
        },
      },
      chunkSizeWarningLimit: 1500, // chunk 大小警告的限制（以 kbs 为单位）
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${resolve(
            __dirname,
            "src/styles/common/index.less"
          )}";`,
        },
      },
    },
  });
};
