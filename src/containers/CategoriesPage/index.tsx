import React from 'react';
import { RouteComponentProps } from 'react-router';
import AppBar from 'components/AppBar';
import IconButton from 'components/Icons/IconButton';
import Menu from 'components/Icons/Menu';
import MoreVert from 'components/Icons/MoreVert';

type Props = RouteComponentProps<{}>;

export default class CategoriesPage extends React.PureComponent<Props> {

  public render() {
    return (
      <>
        <AppBar
          leftIcon={<IconButton icon={<Menu />} />}
          rightIcon={<IconButton icon={<MoreVert />} />}
          titleText='Categories'
        />
        <input type='text'/>
      </>
    );
  }
}
