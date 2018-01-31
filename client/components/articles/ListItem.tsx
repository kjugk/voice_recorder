import * as React from 'react';
import * as Types from '../../types';
import { MouseEvent } from 'react';
import * as moment from 'moment';

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

      <div>
        <button
          className="button is-white"
          title="play"
          onClick={(evt: MouseEvent<HTMLElement>) => {
            evt.stopPropagation();
            props.onPlay(article.id);
          }}
        >
          <span className="icon">
            <i className="fas fa-play" />
          </span>
        </button>
        <button
          className="button is-white is-pulled-right"
          title="delete"
          onClick={(evt: MouseEvent<HTMLElement>) => {
            evt.stopPropagation();
            props.onDelete(article.id);
          }}
        >
          <span className="icon has-text-danger">
            <i className="fas fa-trash" />
          </span>
        </button>
      </div>
    </li>
  );
};
