import { fromJS } from 'immutable';

import {
  LOAD_NEWS_LIST,
  LOAD_NEWS_LIST_SUCCESS,
  LOAD_NEWS_LIST_ERROR
} from './constants';
import { ILoadNewsListAction, INewsListLoaded, INewsListLoadingError } from 'containers/NewsPage/actions';

const initialState = fromJS({
  loading: false,
  error: false,
  hitokoto: undefined
});

type IAction = ILoadNewsListAction | INewsListLoaded | INewsListLoadingError;

export default function newsListReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case LOAD_NEWS_LIST:
      return state
        .set('loading', true)
        .set('error', false)
        .set('news', undefined);
    case LOAD_NEWS_LIST_SUCCESS:
      return state
        .set('loading', false)
        .set('news', action.news);
    case LOAD_NEWS_LIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}
