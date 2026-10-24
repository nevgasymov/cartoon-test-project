import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://rickandmortyapi.com/graphql",
  generates: {
    "schema.graphql": { plugins: ["schema-ast"] },
  },
};

export default config;
