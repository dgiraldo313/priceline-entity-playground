## Prerequisites

- Node.js 16 or higher
- [An Apollo Studio account](https://studio.apollographql.com/login) (free!)

## Installing Dependencies

1. Install NPM packages
   ```sh
   npm install
   ```
2. Install [Rover](https://www.apollographql.com/docs/rover/)
   ```sh
   curl -sSL https://rover.apollo.dev/nix/latest | sh
   ```
3. Install [Apollo Router](https://www.apollographql.com/docs/router/)
   ```sh
   curl -sSL https://router.apollo.dev/download/nix/latest | sh
   ```

## Running subgraphs locally

Note: Run `npm i` before running starting the subgraphs
### Customer Subgraph

```sh
npm run start -w subgraph-customer
```

```
query CustomerInfo($cguid: ID!) {
  customerInfo(cguid: $cguid) {
    fullName
    cguid
    offerNumbers
  }
}
```
```
{
  "cguid": "cguid-12345"
}
```

### Trips Subgraph

```sh
npm run start -w subgraph-trips
```

```
query TripsByOfferNumbers(
   $cguid: ID!, 
   $offerNumbers: [ID!]!
) {
  tripByOfferNumbers(offerNumbers: $offerNumbers) {
    ... on HotelTrip {
      id
      offerNumber
      productType
    }
    ... on FlightTrip {
      offerNumber
      productType
    }
    ... on RentalCarTrip {
      offerNumber
      productType
    }
  }
}
```
```
{
  "offerNumbers": [
    "1234",
    "5678",
    "8910"
  ]
}
```

### Hotels Subgraph

```sh
npm run start -w subgraph-hotels
```

```
query HotelInfoById($hotelId: ID!) {
  hotelInfoById(hotelId: $hotelId) {
    name
    id
    starRating
  }
}
```
```
{
  "hotelId": "101040"
}
```

### Reviews Subgraph

```sh
npm run start -w subgraph-reviews
```

```
query ReviewsByHotelId($hotelId: ID!) {
  reviewsByHotelId(hotelId: $hotelId) {
    reviewerName
    comment
    score
  }
}
```
```
{
  "hotelId": "101040"
}
```

### Interactions Subgraph


```sh
npm run start -w subgraph-interactions
```

```
query HotelFavoritesByCguid($cguid: ID!) {
  hotelFavoritesByCguid(cguid: $cguid) {
    id
    cityId
  }
}
```
```
{
  "cguid": "cguid-12345"
}
```


## Managing Federation

Note: Follow instructions [here](https://representations-typecondition-fix--apollo-federation-docs.netlify.app/docs/federation/managed-federation/setup/#4-connect-the-gateway-to-studio) to create your Supergraph in Apollo Studio and retrieve the key to you'll need to deploy your subgraphs


Store variables in `.env`

```sh
export APOLLO_KEY=service:xxx
export APOLLO_GRAPH_REF=xxx@current
```

Source the env variables to use in terminal
```sh
source .env
```

```sh
rover config auth
# enter api key
```

```sh
rover subgraph publish $APOLLO_GRAPH_REF \
  --name customer --routing-url http://localhost:4001 \
  --schema subgraph-customer/customer.graphql
```

```sh
rover subgraph publish $APOLLO_GRAPH_REF \
  --name trips --routing-url http://localhost:4002 \
  --schema subgraph-trips/trips.graphql
```

```sh
rover subgraph publish $APOLLO_GRAPH_REF \
  --name hotels --routing-url http://localhost:4003 \
  --schema subgraph-hotels/hotels.graphql
```

```sh
rover subgraph publish $APOLLO_GRAPH_REF \
  --name reviews --routing-url http://localhost:4004 \
  --schema subgraph-reviews/reviews.graphql
```

```sh
rover subgraph publish $APOLLO_GRAPH_REF \
  --name interactions --routing-url http://localhost:4005 \
  --schema subgraph-interactions/interactions.graphql
```

```sh
source .env
./router --config router.yaml
```

## Federated Schema

```
query FederatedQuery($cguid: ID!) {
  customerInfo(cguid: $cguid) {
    cguid
    fullName
    offerNumbers
    hotelFavorites {
      id
      cityId
      hotelInfo {
        name
        starRating
      }
    }
    trips {
      ... on HotelTrip {
        id
        productType
        offerNumber
        hotelInfo {
          id
          name
          starRating
          reviews {
            reviewerName
            comment
            score
          }
          isFavorite(cguid: $cguid)
        }
      }
    }
  }
}
```

```
{
  "cguid": "cguid-12345"
}
```
