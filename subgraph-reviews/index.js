import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFile } from "fs/promises";
import { parse } from "graphql";

import resolvers from "./resolvers.js";
import { buildSubgraphSchema } from "@apollo/subgraph";
import ReviewsAPI from "./datasources/reviews-api.js";

const typeDefs = parse(await readFile("./reviews.graphql", "utf8"));

const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  })
});

const port = 4004;
const subgraphName = "ReviewsService";

const { url } = await startStandaloneServer(server, {
  listen: { port },
  async context() {
    return {
      dataSources: {
        reviewsApi: new ReviewsAPI(),
      },
    };
  },
});

console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
