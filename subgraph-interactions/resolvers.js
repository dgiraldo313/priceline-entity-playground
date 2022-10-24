/** @type {import("@apollo/subgraph/dist/schema-helper").GraphQLResolverMap} */
export default {
  Query: {
    hotelFavoritesByCguid(_, { cguid }, { dataSources }) {
      return dataSources.interactionsApi.getHotelFavoritesByCguid(cguid);
    },
  },
  HotelFavorite: {
    __resolveReference(ref, { dataSources }, info) {
      return dataSources.interactionsApi.getHotelFavoritesByCguid(ref.cguid)
    }
  },
  HotelInfo: {
    isFavorite(parent, params, { dataSources }) {
      const matchedUserFavorites = dataSources.interactionsApi.getHotelFavoritesByCguid(params.cguid)
      if (!matchedUserFavorites) return false
      return Boolean(matchedUserFavorites.find(hotel => hotel.id === parent.id));
    }
  },
  Customer: {
    hotelFavorites(parent, __, { dataSources }) {
      return dataSources.interactionsApi.getHotelFavoritesByCguid(parent.cguid)
    }
  }
};
