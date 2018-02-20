import * as React from 'react';
import * as Types from '../../types';
import * as prettyBytes from 'pretty-bytes';
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
        <div>
          <span className="c-list-item-name">date</span>
          <span>{moment(article.createdAt).format('YYYY/MM/DD')}</span>
        </div>
        <div>
          <span style={{marginRight: '.5rem'}}>
            <span className="c-list-item-name">total</span>
            <span>{formatDurationToTime(article.duration)}</span>
          </span>
          <span>
            <span className="c-list-item-name">size</span>
            <span>{prettyBytes(article.size || 0)}</span>
          </span>
        </div>
      </div>
    </>
  );
};
