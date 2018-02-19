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
  const { article, onPlay, onDelete } = props;

  return (
    <li className="column is-4">
      <div className="card">
        <div className="card-content">
          <ListItemHeadline article={article} />
        </div>
        <div className="card-footer">
          <ListItemControl
            onPlayClick={(evt: MouseEvent<HTMLElement>) => {
              evt.stopPropagation();
              onPlay(article.id);
            }}
            onDeleteClick={(evt: MouseEvent<HTMLElement>) => {
              evt.stopPropagation();
              onDelete(article.id);
            }}
          />
        </div>
      </div>
    </li>
  );
};
