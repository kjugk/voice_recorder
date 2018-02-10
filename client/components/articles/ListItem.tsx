import * as React from 'react';
import { MouseEvent } from 'react';
import * as Types from '../../types';

import { ListItemHeadline } from './ListItemHeadline';
import { ListItemControl } from './ListItemControl';

interface ListItemProps {
  article: Types.ArticleItemState;
  onPlay: (id: string) => any;
  onDelete: (id: string) => any;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  const { article } = props;

  return (
    <li className="c-list-item box">
      <ListItemHeadline article={article} />

      <ListItemControl
        onPlayClick={(evt: MouseEvent<HTMLElement>) => {
          evt.stopPropagation();
          props.onPlay(article.id);
        }}
        onDeleteClick={(evt: MouseEvent<HTMLElement>) => {
          evt.stopPropagation();
          props.onDelete(article.id);
        }}
      />
    </li>
  );
};
