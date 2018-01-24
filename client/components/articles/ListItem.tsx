import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemProps {
  id: string;
  title: string;
  onClick: (id: string) => any;
  onDelete: (id: string) => any;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  return (
    <li
      className="c-list-item"
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        props.onClick(props.id);
      }}
    >
      {props.title}
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
