import * as React from 'react';
import * as Types from '../../types';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';

interface ListProps {
  articles: Types.ArticlesState;
  onItemPlay: (id: string) => any;
  onItemDelete: (id: string) => any;
}

export const ArticleList: React.SFC<ListProps> = (props) => {
  return (
    <ul className="columns is-multiline">
      {props.articles.items.map((article) => {
        return (
          <ArticleListItem
            key={article.id}
            article={article}
            onPlay={props.onItemPlay}
            onDelete={props.onItemDelete}
          />
        );
      })}
    </ul>
  );
};
