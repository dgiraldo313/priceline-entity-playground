/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    reviewsByHotelId(_, { hotelId }, { dataSources }) {
      return dataSources.reviewsApi.getReviewsByHotelId(hotelId);
    },
  },
  HotelInfo: {
    reviews(parent, __, { dataSources }) {
      return dataSources.reviewsApi.getReviewsByHotelId(parent.id);
    }
  }
};
