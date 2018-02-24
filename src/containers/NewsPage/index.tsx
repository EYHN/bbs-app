import React from 'react';
import { RouteComponentProps } from 'react-router';

import SearchBar from 'components/SearchBar';
import AppBar from 'components/AppBar';

import PostPreviewCard from 'components/PostPreviewCard';
import { makeSelectNewsList } from './selectors';
import { createSelector } from 'reselect';
import { Dispatch, compose } from 'redux';
import { loadNewsList } from 'containers/NewsPage/actions';
import { returntypeof } from 'react-redux-typescript';
import { connect } from 'react-redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/NewsPage/saga';
import reducer from 'containers/NewsPage/reducer';

interface INewsPageProps {
}

export const mapStateToProps = createSelector(
  makeSelectNewsList(),
  (news) => ({ news })
);

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeNewsList: () => { dispatch(loadNewsList()); }
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = INewsPageProps & RouteComponentProps<{}> & typeof stateProps & typeof dispatchProps;

export class NewsPage extends React.PureComponent<Props> {

  public render() {
    const posts = typeof this.props.news === 'object' && this.props.news.map((post) => (
      <PostPreviewCard
        style={{ margin: '8px 0px' }}
        title={post.title}
        content={post.content}
        metadata='138 views ,  25 commits'
        key={post.id}
        cover={post.cover}
      />));
    return (
      <>
        <AppBar>
          <SearchBar />
        </AppBar>
        {posts}
      </>
    );
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<typeof stateProps, typeof dispatchProps, INewsPageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'newsPage', reducer });
const withSaga = injectSaga({ key: 'newsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(NewsPage);
