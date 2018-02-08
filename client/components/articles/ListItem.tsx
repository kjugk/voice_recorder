import * as React from 'react';
import * as Types from '../../types';
import { MouseEvent } from 'react';
import * as moment from 'moment';

import { formatDurationToTime } from '../../lib/Player';
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
      <div className="columns is-mobile ">
        <div className="column">
          <span className="title is-5">{article.title}</span>
        </div>
        <div className="column is-narrow">
          <div>
            <span className="is-pulled-right is-size-7">
              {moment(article.createdAt).format('YYYY/MM/DD')}
            </span>
          </div>
          <div>
            <span className="is-pulled-right is-size-7">
              {formatDurationToTime(article.duration)}
            </span>
          </div>
        </div>
      </div>

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
