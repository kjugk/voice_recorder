import * as React from 'react';
import * as Types from '../../types';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ListItem } from './ListItem';

interface ListProps {
  articles: Types.ArticlesState;
  onItemPlay: (id: string) => any;
  onItemDelete: (id: string) => any;
}

export const List: React.SFC<ListProps> = (props) => {
  return (
    <ul className="c-list">
      <ReactCSSTransitionGroup
        transitionName="list"
        transitionLeaveTimeout={200}
      >
        {props.articles.items.map((article) => {
          return (
            <ListItem
              key={article.id}
              article={article}
              onPlay={props.onItemPlay}
              onDelete={props.onItemDelete}
            />
          );
        })}
      </ReactCSSTransitionGroup>
    </ul>
  );
};
