import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemProps {
  id: string;
  title: string;
  onClick: (id: string) => void;
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
    </li>
  );
};
