import { returntypeof } from 'react-redux-typescript';
import { createSelector } from 'reselect';
import React from 'react';
import { Dispatch, compose } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Helloworld from 'components/helloworld/index';
import { changeLocale } from 'containers/LanguageProvider/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { appLocales } from 'i18n';
import { changeTheme } from 'containers/ThemeProvider/actions';
import { makeSelectThemeName } from 'containers/ThemeProvider/selectors';
import { appThemes } from 'withStyles';
import { loadHitokoto } from 'containers/HomePage/actions';
import reducer from './reducer';
import saga from './saga';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectHitokoto } from 'containers/HomePage/selectors';
import SearchBar from 'components/SearchBar';
import AppBar from 'components/AppBar';
import BottomNavigation from 'components/BottomNavigation';
import BottomNavigationLink from 'components/BottomNavigation/Link';
import FiberNewIcon from 'components/icons/FiberNew';
import AccountCircleIcon from 'components/icons/AccountCircle';
import ListIcon from 'components/icons/List';

interface IHomePageProps {
}

const mapStateToProps = createSelector(
  makeSelectLocale(),
  makeSelectThemeName(),
  makeSelectHitokoto(),
  (locale, theme, hitokoto) => ({ locale, theme, hitokoto })
);

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  changeLocale: (locale: string) => { dispatch(changeLocale(locale)); },
  changeTheme: (theme: string) => { dispatch(changeTheme(theme)); },
  onGetHitokoto: () => (dispatch(loadHitokoto()))
});

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);

type Props = typeof stateProps & IHomePageProps & typeof dispatchProps & RouteComponentProps<{}>;

export class HomePage extends React.PureComponent<Props, undefined> {

  public render() {
    const pathname = this.props.location.pathname || '/news';
    return (
      <div>
        <AppBar>
          <SearchBar />
        </AppBar>
        <Helloworld />
        <select
          name='Locale'
          value={this.props.locale}
          onChange={(e) => {
            this.props.changeLocale(e.currentTarget.value);
          }}
        >
          {
            appLocales.map((locale) => {
              return <option key={locale} value={locale}>{locale}</option>;
            })
          }
        </select>
        <select
          name='Theme'
          value={this.props.theme}
          onChange={(e) => {
            this.props.changeTheme(e.currentTarget.value);
          }}
        >
          {
            Object.keys(appThemes).map((theme) => {
              return <option key={theme} value={theme}>{theme}</option>;
            })
          }
        </select>
        <p>{this.props.hitokoto}</p>
        <BottomNavigation>
          <BottomNavigationLink
            to='/news'
            active={pathname.startsWith('/news')}
            label='News'
            icon={FiberNewIcon}
          />
          <BottomNavigationLink
            to='/categories'
            active={pathname.startsWith('/categories')}
            label='Categories'
            icon={ListIcon}
          />
          <BottomNavigationLink
            to='/account'
            active={pathname.startsWith('/account')}
            label='Account'
            icon={AccountCircleIcon}
          />
        </BottomNavigation>
      </div>
    );
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<typeof stateProps, typeof dispatchProps, IHomePageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
