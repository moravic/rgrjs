import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from "graphql"


let Schema = (db) => {
  let counter = 42
  let store = {};

  let storeType = new GraphQLObjectType({
    name: "Store",
    fields: () => ({
    links: {
        type: new GraphQLList(linkType),
        resolve: () => db.collection("links").find({}).toArray()
      }
    })
  });

  let linkType = new GraphQLObjectType({
    name: "link",
    fields: () => ({
      _id: { type: GraphQLString},
      title: { type: GraphQLString},
      url: { type: GraphQLString}
    })
  });

  let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: "Query",
      fields: () => ({
        counter: {
          type: GraphQLInt,
          resolve: () => counter
        },
        message: {
          type: GraphQLString,
          resolve: () => "Hello GraphQL"
        },
        store: {
          type: storeType,
          resolve: () => store
        }
      })
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: () => ({
          incrementCounter: {
            type: GraphQLInt,
            resolve: () => ++counter
          }
      })
    })
  });

  return schema;
}

export default Schema;
