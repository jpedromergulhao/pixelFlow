import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // Gera pacotes para projetos legados (require) e modernos (import)
  dts: true, // Gera as tipagens automaticamente
  splitting: false, // Não precisa dividir código em arquivos menores no backend
  sourcemap: true,
  clean: true,
  minify: true
});