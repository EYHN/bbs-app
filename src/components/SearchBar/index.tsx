import React from 'react';
import { css, withStyles } from 'withStyles';
import { IWithStyleProps } from 'Interfaces/react-with-style';
import SearchIcon from 'components/Icons/Search';
import MicIcon from 'components/Icons/Mic';
import mergeProps from 'utils/mergeProps';

interface ISearchBarProps {
}

@withStyles(({ color }) => ({
  SearchBar: {
    'display': 'inline-flex',
    'min-height': '48px',
    'width': 'calc(100% - 16px)',
    'border-radius': '2px',
    'box-shadow': '0 0 2px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.24)',
    'background-color': color.searchBar,
    'padding-left': '16px',
    'padding-right': '16px',
    'margin': '8px',
    'align-items': 'center',
    'justify-content': 'space-between'
  },
  icon: {
    display: 'inline-block',
    width: '24px',
    height: '24px',
    color: color.searchBarIcon
  }
}))
export default class SearchBar extends React.PureComponent<
    IWithStyleProps & React.HTMLProps<HTMLElement> & ISearchBarProps
    , undefined> {
  public render() {
    const {
      theme,
      styles,
      ...otherProps
    } = this.props;
    return (
      <article
        {
          ...mergeProps(css(this.props.styles.SearchBar), otherProps)
        }
      >
        <SearchIcon {...css(this.props.styles.icon)} />
        <MicIcon {...css(this.props.styles.icon)} />
      </article>
    );
  }
}
