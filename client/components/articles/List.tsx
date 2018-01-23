import * as React from 'react';
import * as Types from '../../types';
import { ListItem } from './ListItem';

interface ListProps {
  articles: Types.ArticlesState;
  onItemClick: (id: string) => any;
}

export const List: React.SFC<ListProps> = (props) => {
  return (
    <ul className="c-list">
      {props.articles.items.map((article) => {
        return (
          <ListItem
            key={article.id}
            id={article.id}
            title={article.title}
            onClick={props.onItemClick}
          />
        );
      })}
    </ul>
  );
};
