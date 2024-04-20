import { defineConfig } from "orval";

export default defineConfig({
  base: {

    input: "http://142.93.161.127:3000/api-json",
    output: {
      target: "src/api/index.ts",
      schemas: "src/api/model",
      mode: "tags-split",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/api/mutator/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});