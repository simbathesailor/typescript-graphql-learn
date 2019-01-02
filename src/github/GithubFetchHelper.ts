import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";

enum SORT_ORDER {
  ASC,
  DEC
}
class GithubFetchHelper extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.github.com/search/";
  }
  // willSendRequest(request: RequestOptions) {

  // }
  async getForkedRepo(options: {
    order: SORT_ORDER;
    pageNo: number;
    sort: string;
    queryString: string;
  }) {
    const { order, pageNo, sort, queryString } = options;
    const results = await this.get(
      `repositories?q=${queryString}&sort=${sort}&order=${order}&page=${pageNo}`
    );
    if (results && results.items) {
      const parsedResult = results.items.map(result => {
        const {
          id,
          owner,
          description,
          open_issues_count,
          stargazers_count,
          created_at
        } = result;
        const { avatar_url = "", url = "" } = owner || {};
        return {
          id,
          avatar_url,
          url,
          description,
          open_issues_count,
          stargazers_count,
          created_at
        };
      });
      return parsedResult;
    }
    return [];
  }
}

export default GithubFetchHelper;
