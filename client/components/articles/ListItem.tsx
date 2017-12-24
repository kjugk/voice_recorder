import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemProps {
  id: number;
  title: string;
  onClick: (id: number) => void;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  return (
    <li
      onClick={(e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        props.onClick(props.id);
      }}
    >
      {props.title}
    </li>
  );
};
