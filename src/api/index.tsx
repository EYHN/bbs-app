import url from 'url';

export const apiHref = 'http://localhost:8080/';

const Api = {
  getNewsList: () => fetch(url.resolve(apiHref, '/news.json')).then((res) => res.json())
};

export default Api;
