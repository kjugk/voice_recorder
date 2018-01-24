import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemProps {
  id: string;
  title: string;
  onPlay: (id: string) => any;
  onDelete: (id: string) => any;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  return (
    <li className="c-list-item">
      <span className="title is-5">{props.title}</span>
      <button
        className="button is-primary is-small"
        onClick={(evt: MouseEvent<HTMLElement>) => {
          evt.stopPropagation();
          props.onPlay(props.id);
        }}
      >
        play
      </button>
      <button
        className="button is-danger is-small"
        onClick={(evt: MouseEvent<HTMLElement>) => {
          evt.stopPropagation();
          props.onDelete(props.id);
        }}
      >
        delete
      </button>
    </li>
  );
};
