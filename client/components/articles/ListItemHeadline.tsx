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
    <>
      <h5 className="title is-5 c-list-item-title">{article.title}</h5>
      <div className="is-size-7">
        <div>date: {moment(article.createdAt).format('YYYY/MM/DD')}</div>
        <div>total: {formatDurationToTime(article.duration)}</div>
      </div>
    </>
  );
};
