import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { parse } from "graphql";

import resolvers from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import TripsAPI from "./datasources/trips-api.js";

const typeDefs = parse(await readFile("./trips.graphql", "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

const port = 4002;
const subgraphName = "ItineraryService";

const { url } = await startStandaloneServer(server, {
  listen: { port },
  async context() {
    return {
      dataSources: {
        tripsApi: new TripsAPI(),
      },
    };
  },
});

console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
