import { createRequire } from "module";
const require = createRequire(import.meta.url);

const data = require("./trips_data.json");
let trips = data.trips;

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class TripsAPI {
  initialize() {}

  getTripsByOfferNumbers(offerNumbers) {
    return trips.filter((r) => offerNumbers.includes(r.offerNumber));
  }
}
