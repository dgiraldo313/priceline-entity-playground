import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { parse } from "graphql";
import { buildSubgraphSchema } from "@apollo/subgraph";

import resolvers from "./resolvers.js";
import CustomerAPI from "./datasources/customer-api.js";

const typeDefs = parse(await readFile("./customer.graphql", "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

const port = 4001;
const subgraphName = "profileQL";

const { url } = await startStandaloneServer(server, {
  listen: { port },
  async context() {
    return {
      dataSources: {
        customerAPI: new CustomerAPI(),
      },
    };
  },
});

console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
