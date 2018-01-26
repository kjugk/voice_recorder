import * as React from 'react';
import * as Types from '../../types';
import { MouseEvent } from 'react';

import { formatDurationToTime } from '../../lib/Player';

interface ListItemProps {
  article: Types.ArticleItemState;
  onPlay: (id: string) => any;
  onDelete: (id: string) => any;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  const { article } = props;
  return (
    <li className="c-list-item box">
      <div className="columns is-mobile ">
        <div className="column">
          <span className="title is-5">{article.title}</span>
        </div>
        <div className="column is-narrow">
          <span className="is-pulled-right is-size-7">
            {formatDurationToTime(article.duration)}
          </span>
        </div>
      </div>

      <div>
        <button
          className="button is-primary is-small"
          onClick={(evt: MouseEvent<HTMLElement>) => {
            evt.stopPropagation();
            props.onPlay(article.id);
          }}
        >
          play
        </button>
        <button
          className="button is-danger is-small"
          onClick={(evt: MouseEvent<HTMLElement>) => {
            evt.stopPropagation();
            props.onDelete(article.id);
          }}
        >
          delete
        </button>
      </div>
    </li>
  );
};
