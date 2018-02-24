import { LOAD_NEWS_LIST, LOAD_NEWS_LIST_SUCCESS, LOAD_NEWS_LIST_ERROR } from 'containers/NewsPage/constants';

export interface ILoadNewsListAction {
  type: typeof LOAD_NEWS_LIST;
}

export interface INewsListLoaded {
  type: typeof LOAD_NEWS_LIST_SUCCESS;
  news: IPost[];
}

export interface INewsListLoadingError {
  type: typeof LOAD_NEWS_LIST_ERROR;
  error: any;
}

export function loadNewsList(): ILoadNewsListAction {
  return {
    type: LOAD_NEWS_LIST
  };
}

export function NewsListLoaded(news: IPost[]): INewsListLoaded {
  return {
    type: LOAD_NEWS_LIST_SUCCESS,
    news
  };
}

export function NewsListLoadingError(error: any): INewsListLoadingError {
  return {
    type: LOAD_NEWS_LIST_ERROR,
    error
  };
}
