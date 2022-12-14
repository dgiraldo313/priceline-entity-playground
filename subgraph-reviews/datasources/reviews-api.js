import { createRequire } from "module";
const require = createRequire(import.meta.url);

const reviews = require("./reviews_data.json");

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class ReviewsAPI {
  initialize() {}

  getReviewsByHotelId(hotelId) {
    return reviews[hotelId]
  }
}
