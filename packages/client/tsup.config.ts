import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts", // Ponto de entrada Vanilla
    "src/next.tsx"  // Ponto de entrada Next.js
  ],
  format: ["cjs", "esm"], // Gera pacotes para projetos legados e modernos
  dts: true, // Gera os arquivos .d.ts de tipagem automaticamente
  splitting: true,
  sourcemap: true,
  clean: true, // Limpa a pasta dist antes de cada build
  external: ["react", "next", "next/script"], // Impede que o tsup coloque o React e o Next dentro do seu pacote
  minify: true // Otimiza o tamanho final do código
});