const Resolvers = {
  Query: {
    getGithubList: async (_, args, ctx, __) => {
      const { dataSources } = ctx;
      const { order, pageNo, sort, queryString } = args.input;
      return dataSources.gitHubApi.getForkedRepo({
        order,
        pageNo,
        sort,
        queryString
      });
    }
  }
};

export default Resolvers;
