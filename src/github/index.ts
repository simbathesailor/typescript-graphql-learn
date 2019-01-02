// module.exports = {
//   resolvers: require('./project.resolvers'),
//   typeDefs: require('../../utils/gqlLoader')('project/project.graphql'),
//   model: require('./project.model')
// }
import "graphql-import-node";
import Resolvers from "./github.resolver";
import gitHubTypeDefs from "./github.graphql";
import { makeExecutableSchema } from "graphql-tools";
export {
  Resolvers as resolvers,
  gitHubTypeDefs as typeDefs,
};