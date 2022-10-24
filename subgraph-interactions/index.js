import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { parse } from "graphql";

import resolvers from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import InteractionsAPI from "./datasources/interactions_api.js";

const typeDefs = parse(await readFile("./interactions.graphql", "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

const port = 4005;
const subgraphName = "Interactions Service";

const { url } = await startStandaloneServer(server, {
  listen: { port },
  async context() {
    return {
      dataSources: {
        interactionsApi: new InteractionsAPI(),
      },
    };
  },
});

console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
