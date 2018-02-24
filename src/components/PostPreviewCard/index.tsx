import React from 'react';
import { pure } from 'recompose';
import Card from 'components/Card';
import PostPreviewTitle from './title';
import mergeProps from 'utils/mergeProps';
import CategoryLabel from './label';
import Android from 'components/Icons/Android';
import PostPreviewContent from './content';
import PostMetadata from './metadata';
import Reimg from 'components/Reimg';

type IProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  metadata: React.ReactNode;
  cover?: IImageResource;
} & React.HTMLProps<HTMLHeadingElement>;

const PostPreviewCard = (props: IProps) => {
  const {
    children,
    title,
    content,
    metadata,
    cover,
    ...otherProps
  } = props;
  const postCover =
    cover &&
    (
      <Reimg
        style={{width: '100%', margin: '16px 0'}}
        image={cover}
      />
    );
  return (
    <Card {...mergeProps({ style: { padding: '16px 0 12px' } }, otherProps)}>
      <CategoryLabel
        style={{ margin: '0 16px' }}
        icon={<Android width='19px' height='19px' color='green' />}
        title='Android'
        subtitle='• 13m'
      />
      {postCover}
      <PostPreviewTitle style={{ margin: '8px 16px 4px' }}>
        {title}
      </PostPreviewTitle>
      <PostPreviewContent style={{ margin: '0 16px 16px' }}>
        {content}
      </PostPreviewContent>
      <PostMetadata style={{ margin: '0 16px' }}>
        {metadata}
      </PostMetadata>
    </Card>
  );
};

export default pure(PostPreviewCard);
