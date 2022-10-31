import { createRequire } from "module";
const require = createRequire(import.meta.url);

const custumerInfo = require("./customer_data.json");

/**
 * @typedef {import("apollo-datasource").DataSource} DataSource
 * @implements DataSource
 */
export default class CustomerAPI {
  initialize() {}

  getCustomerInfo(cguid) {
    const matchedCustInfo = custumerInfo[cguid]
    return {  
      cguid,
      ...matchedCustInfo
    }
  }
}
