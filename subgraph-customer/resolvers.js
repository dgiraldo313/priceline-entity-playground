/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    customerInfo(_, { cguid }, { dataSources }) {
      return dataSources.customerAPI.getCustomerInfo(cguid);
    }
  },
  Customer: {
    __resolveReference(ref, { dataSources }, info) {
      return dataSources.customerAPI.getCustomerInfo(ref.cguid)
    },
    upcomingTrips: (root, { startDate, endDate}, context) => {
      // Do some filtering logic based on state and end date
      return root.customerTrips
    }
  }
};
