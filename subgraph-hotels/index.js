import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { parse } from "graphql";

import resolvers from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import HotelsAPI from "./datasources/hotels-api.js";

const typeDefs = parse(await readFile("./hotels.graphql", "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

const port = 4003;
const subgraphName = "HotelService";

const { url } = await startStandaloneServer(server, {
  listen: { port },
  async context() {
    return {
      dataSources: {
        hotelsApi: new HotelsAPI(),
      },
    };
  },
});

console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
