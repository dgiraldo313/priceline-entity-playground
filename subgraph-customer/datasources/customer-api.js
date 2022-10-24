import { createRequire } from "module";
const require = createRequire(import.meta.url);

const custumerInfo = require("./customer_data.json");

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class CustomerAPI {
  initialize() {}

  // SELECT * FROM locations
  getCustomerInfo(cguid) {
    const matchedCustInfo = custumerInfo[cguid]
    return {  
      cguid,
      offerNumbers: matchedCustInfo.customerTrips.map(t => t.offerNumber),
      ...matchedCustInfo
    }
  }
}
