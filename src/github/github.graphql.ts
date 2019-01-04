import { ApolloServer, gql } from "apollo-server";

const QueryGithub = gql`
  enum SORT_ORDER {
    ASC
    DEC
  }
  input GithubOptions {
    order: SORT_ORDER
    pageNo: Int
    sort: String
    queryString: String
  }
  type GithubResponse {
    id: Int
    avatar_url: String
    url: String
    description: String
    open_issues_count: Int
    stargazers_count: Int
    created_at: String
    followers_url: String
  }

  extend type Query {
    getGithubList(input: GithubOptions!): [GithubResponse]!
  }
`;
export default QueryGithub;
