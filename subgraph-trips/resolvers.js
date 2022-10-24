/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    tripByOfferNumbers(_, { offerNumbers }, { dataSources }) {
      return dataSources.tripsApi.getTripsByOfferNumbers(offerNumbers);
    },
  },
  Trip: {
    __resolveType(obj, context, info){
      if (obj.productType === "HTL") {
        return "HotelTrip"
      }
      if (obj.productType === "FLY") {
        return "FlightTrip"
      }
      if (obj.productType === "CAR") {
        return "RentalCarTrip"
      }
    },
  },
  Customer: {
    trips(parent, __, { dataSources }) {
      return dataSources.tripsApi.getTripsByOfferNumbers(parent.offerNumbers)
    }
  }
};
