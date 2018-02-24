import { NewsListLoaded, NewsListLoadingError, loadNewsList } from 'containers/NewsPage/actions';
import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_NEWS_LIST } from 'containers/NewsPage/constants';
import Api from 'api';

export function* getNewsList() {
  try {
    const res = yield call(Api.getNewsList);
    yield put(NewsListLoaded(res));
  } catch (err) {
    yield put(NewsListLoadingError(err));
  }
}

export default function* hitokotoData() {
  yield takeLatest(LOAD_NEWS_LIST, getNewsList);
  yield put(loadNewsList());
}
