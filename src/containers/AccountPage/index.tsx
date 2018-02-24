import React from 'react';
import { RouteComponentProps } from 'react-router';
import AppBar from 'components/AppBar';
import IconButton from 'components/Icons/IconButton';
import Menu from 'components/Icons/Menu';
import MoreVert from 'components/Icons/MoreVert';
import AvatarAppBarLayout from 'components/AppBar/AvatarAppBarLayout';
import Tabs, { TabsChangeEventHandler } from 'components/Tabs/Tabs';
import Tab from 'components/Tabs/Tab';
import SwipeableViews, { OnSwitchingCallback } from 'react-swipeable-views';
import { withStyles, css } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import { returntypeof } from 'react-redux-typescript';
import { Dispatch, compose } from 'redux';
import { push } from 'react-router-redux';
import { LocationDescriptor } from 'history';
import { connect } from 'react-redux';
import Lists from 'components/Lists/Lists';
import ListHeading from 'components/Lists/Heading';
import ListIconWithTwoLine from 'components/Lists/IconWithTwoLine';
import ListHr from 'components/Lists/Hr';
import Email from 'components/Icons/Email';
import Phone from 'components/Icons/Phone';
import Language from 'components/Icons/Language';
import PostPreviewCard from 'components/PostPreviewCard';
import { pure } from 'recompose';

const postdata: any[] = [
  {
    id: 1,
    title: 'Curabitur sed arcu vel nisi volutpat faucibus. Fusce velit arcu…',
    // tslint:disable-next-line:max-line-length
    content: 'Suspendisse commodo arcu tortor, condimentum convallis erat rutrum volutpat. Fusce lobortis molestie arcu sed luctus…',
    metadata: {
      views: 138,
      commits: 28
    }
  },
  {
    id: 2,
    title: 'Nullam tincidunt eget arcu eget sagittis. Suspendisse finibus…',
    // tslint:disable-next-line:max-line-length
    content: 'Nulla tempus massa non ex mollis, a blandit sapien laoreet. In eu cursus erat. Vivamus et tellus congue, molestie odio ullamcorper…',
    metadata: {
      views: 138,
      commits: 28
    },
    cover: {
      type: 'image',
      src: 'http://localhost:8080/static/\u3064\u3088\u3044\u9b54\u6cd5\u5c11\u5973\u3061\u3083\u3093.jpg',
      // tslint:disable-next-line:max-line-length
      thumb: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAaADIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDz/Rdfa2ZYZMFCw+bPTFd1bXL6xBi2vUUqMqGAIy3BB715Te2ZhiNxbO0loW+U4+ZG/uuOx9D0NanhfUlsdWtTfGTYxO3B24bHGa6oVOjOWdLqj0zQfGl3ZXcFlEn23Y4VAScde3tmvSvEvjLRrOwvbCbWY7HU1j2lAjM4Y9dgwN3cZHSvDJbpTrSXtvEhVD5cixrgtx/rDt4wc0vio3zQxXt7eS3dwYgEeaTf5UeeRz3OM4olFS17CjJx07nt3hHWotU8OoUnaaSAmNywwVPUA+tcZ8Q9RvdNgN1bTYE6+U6uThcHhh+eD/8AWrO+EutRLo2pQTSC32bZ5JWbg8YJyeF4I4rnfHvim31WRbSyuFmhVgA6qSC3c5PX+XFZNJXN02UEu7xkVpLxt5ALYXvRWCdQgjOxZroqvAIcAY/Kisudm/IYsVxLaMFExUMMEdPwrYurkx3NiZEbUAw3o7ZLsc/d467f61h2IEkqq4DDceG57VZck6IhPVbj5fb5O35CtHuZWO38Ma1pkEF0LkExyIQ2NrSAdQDntWJqGsq7xeVMGSGXfGoUE4zkA9RweMdDXNQk4JzzzQpPmg5OQeDWnM7WMfZx5uY73RrTUdesNVlv7y20+wkkSe4HlhJZurKiDoEySfy4rlCy/aNmGWJRhNq8knqffisx5ZDvy7HGQOaQO3lv8x6Edfaspao3gtblhmRXZfm4OOcUVQyfU0VNi+c//9k=',
      width: 2300,
      height: 1210,
      size: 1594972,
      dominantColor: '#24323c'
    }
  }
];

export interface IProps {

}

export const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
  pushHistory: (location: LocationDescriptor) => { dispatch(push(location)); }
});

const dispatchProps = returntypeof(mapDispatchToProps);

type Props = RouteComponentProps<{}> & IWithStyleProps & RouteComponentProps<{ tab: string }> & typeof dispatchProps;

const Page1 = pure(() => (
  <Lists>
    <ListHeading>
      About Me
    </ListHeading>
    <ListIconWithTwoLine
      icon={<Email />}
      primaryText='cneyhn@gmail.com'
      secondaryText='Email'
    />
    <ListIconWithTwoLine
      icon={<Phone />}
      primaryText='+86 139 2128 8677'
      secondaryText='Phone'
    />
    <ListIconWithTwoLine
      icon={<Language />}
      primaryText='Chinese'
      secondaryText='Language'
    />
    <ListHr />
  </Lists>
));

const AvatarAppBar = pure(() => (
  <AvatarAppBarLayout
    leftIcon={<IconButton icon={<Menu />} />}
    rightIcon={<IconButton icon={<MoreVert />} />}
    titleText='EYHN'
    subTitleText='online'
    // tslint:disable-next-line:max-line-length
    avatarImg={<img width='54px' src='https://q1.qlogo.cn/headimg_dl?bs=1106996185&dst_uin=1106996185&spec=100&url_enc=0&referer=bu_interface&term_type=PC' />}
  />
));

const Page2 = pure(() => {
  const posts = postdata.map((post: any) => (
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
    {posts}
    </>
  );
});

@withStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1
  },
  appbar: {
    flexShrink: 0
  },
  page: {
    overflow: 'hidden'
  }
}))
export class AccountPage extends React.PureComponent<Props> {

  state = {
    tabsIndex: 0,
    tabsIndicatorTransition: true,
    tabsIndicatorOffset: 0
  };

  public render() {
    return (
      <div {...css(this.props.styles.root)}>
        <AppBar {...css(this.props.styles.appbar)}>
          <AvatarAppBar />
          <Tabs
            value={this.state.tabsIndex}
            onTabsChange={this.handleTabsChange}
            indicatorOffset={this.state.tabsIndicatorOffset}
            indicatorTransition={this.state.tabsIndicatorTransition}
          >
            <Tab>Overview</Tab>
            <Tab>Posts</Tab>
            <Tab>Followers</Tab>
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.tabsIndex}
          onSwitching={this.handleSwipeableViewsSwitching}
          containerStyle={{ flexGrow: 1 }}
          {...css(this.props.styles.body)}
        >
          <div {...css(this.props.styles.page)}>
            <Page1 />
          </div>
          <div {...css(this.props.styles.page)}>
            <Page2 />
          </div>
          <div {...css(this.props.styles.page)}>
            slide n°3
            </div>
        </SwipeableViews>
      </div>
    );
  }

  private handleTabsChange: TabsChangeEventHandler = (value) => {
    this.setState({
      ...this.state,
      tabsIndex: value,
      tabsIndicatorOffset: 0,
      tabsIndicatorTransition: true
    });
  }

  private handleSwipeableViewsSwitching: OnSwitchingCallback = (value, type) => {
    if (type === 'move') {
      this.setState({
        ...this.state,
        tabsIndicatorOffset: (this.state.tabsIndex - value) * -1,
        tabsIndicatorTransition: false
      });
    } else {
      this.setState({
        ...this.state,
        tabsIndex: value,
        tabsIndicatorOffset: 0,
        tabsIndicatorTransition: true
      });
    }
  }
}

// tslint:disable-next-line:max-line-length
const withConnect = connect<{}, typeof dispatchProps, IProps>(null, mapDispatchToProps);

export default compose(
  withConnect
)(AccountPage);
