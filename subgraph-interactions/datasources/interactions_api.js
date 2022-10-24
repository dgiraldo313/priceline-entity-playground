import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require("./interactions_data.json");
let { hotelFavorites} = data;

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class InteractionsAPI {
  initialize() {}

  getHotelFavoritesByCguid(cguid) {
    const matchedFacoriteHotels = hotelFavorites[cguid]
    if (!matchedFacoriteHotels) return []
    return matchedFacoriteHotels.map(
      fav => ({ cguid, ...fav })
    )
  }
}
