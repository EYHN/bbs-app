import React from 'react';
import { RouteComponentProps, Route } from 'react-router';

import BottomNavigation from 'components/BottomNavigation';
import BottomNavigationLink from 'components/BottomNavigation/Link';
import FiberNewIcon from 'components/Icons/FiberNew';
import AccountCircleIcon from 'components/Icons/AccountCircle';
import ListIcon from 'components/Icons/List';
import NewsPage from 'containers/NewsPage/Loadable';
import CategoriesPage from 'containers/CategoriesPage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import FadeInOutPageSwitch from 'components/FadeInOutPageSwitch';

type Props = IWithStyleProps & RouteComponentProps<{}>;

@withStyles(() => ({
  homePage: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  container: {
    position: 'relative',
    flexGrow: 1
  },
  page: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: '100%',
    width: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  }
}))
export class HomePage extends React.PureComponent<Props> {

  state = {
    progress: undefined as number
  };

  public render() {
    const pathname = this.props.location.pathname || '/news';
    const activeTab =
      (pathname.startsWith('/categories') && 'categories') ||
      (pathname.startsWith('/account') && 'account') ||
      'news';
    return (
      <div {...css(this.props.styles.homePage)}>
        <FadeInOutPageSwitch
          {...css(this.props.styles.container)}
          propsEachPage={...css(this.props.styles.page)}
          transitionKey={activeTab}
          location={this.props.location}
        >
          <Route exact path='/' component={NewsPage} />
          <Route path='/news' component={NewsPage} />
          <Route path='/categories' component={CategoriesPage} />
          <Route path='/account' component={AccountPage} />
        </FadeInOutPageSwitch>

        <BottomNavigation>
          <BottomNavigationLink
            to='/'
            active={activeTab === 'news'}
            label='News'
            icon={<FiberNewIcon />}
            key='news'
          />
          <BottomNavigationLink
            to='/categories'
            active={activeTab === 'categories'}
            label='Categories'
            icon={<ListIcon />}
            key='categories'
          />
          <BottomNavigationLink
            to='/account'
            active={activeTab === 'account'}
            label='Account'
            icon={<AccountCircleIcon />}
            key='account'
          />
        </BottomNavigation>
      </div>
    );
  }
}

export default HomePage;
