import * as React from 'react';
import * as Types from '../../types';
import * as moment from 'moment';
import { formatDurationToTime } from '../../lib/Player';

interface ListIteamHeadlineProps {
  article: Types.ArticleItemState;
}

export const ListItemHeadline: React.SFC<ListIteamHeadlineProps> = (props) => {
  const { article } = props;

  return (
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
  );
};
