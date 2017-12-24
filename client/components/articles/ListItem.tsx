import * as React from 'react';

interface ListItemProps {
  id: number;
  title: string;
  onClick: (id: number) => void;
}

export const ListItem: React.SFC<ListItemProps> = (props) => {
  return(
    <li onClick={() => {props.onClick(props.id); }}>
      {props.title}
    </li>
  );
};
