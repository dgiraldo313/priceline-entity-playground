/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    hotelInfoById(_, { hotelId }, { dataSources }) {
      return dataSources.hotelsApi.getHotelInfoById(hotelId)
    },
  },
  HotelInfo: {
    __resolveReference(ref, { dataSources }, info) {
      return dataSources.hotelsApi.getHotelInfoById(ref.id)
    }
  },
  HotelTrip: {
    hotelInfo(parent, __, { dataSources }) {
      return dataSources.hotelsApi.getHotelInfoById(parent.id);
    }
  },
  HotelFavorite: {
    hotelInfo(parent, __, { dataSources }) {
      return dataSources.hotelsApi.getHotelInfoById(parent.id);
    }
  }
};
