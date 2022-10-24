import { createRequire } from "module";
const require = createRequire(import.meta.url);

const hotels = require("./hotels_data.json");

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class HotelsAPI {
  initialize() {}

  getHotelInfoById(hotelId) {
    const matchedHotel = hotels[hotelId]
    return {
      id: hotelId,
      ...matchedHotel
    }
  }
}
