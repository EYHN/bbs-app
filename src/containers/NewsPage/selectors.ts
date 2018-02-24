import { IState } from 'Interfaces/state';
import { createSelector } from 'reselect';

export const selectNewsPage = (state: IState) => state.get('newsPage');

export const makeSelectNewsList = () => createSelector(
  selectNewsPage,
  (newsPageState) => newsPageState.get('news') as IPost[]
);
