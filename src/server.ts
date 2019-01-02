import "graphql-import-node";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import { mergeSchemas } from "graphql-tools";
import merge from "lodash/merge";
import GithubFetchHelper from "./github/GithubFetchHelper";
import {
  resolvers as GithubResolvers,
  typeDefs as GithubTypeDef
} from "./github";

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton"
  }
];

const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books
  }
};

const schemaTest = makeExecutableSchema({
  typeDefs: [typeDefs, GithubTypeDef],
  resolvers: merge({}, resolvers, GithubResolvers)
});
const server = new ApolloServer({
  schema: schemaTest,
  dataSources: () => {
    return {
      gitHubApi: new GithubFetchHelper()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

export default server;
