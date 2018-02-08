import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemControlProps {
  onPlayClick: (evt: MouseEvent<HTMLElement>) => any;
  onDeleteClick: (evt: MouseEvent<HTMLElement>) => any;
}

export const ListItemControl: React.SFC<ListItemControlProps> = (props) => {
  return(
    <div>
      <button
        className="button is-white"
        title="play"
        onClick={props.onPlayClick}
      >
        <span className="icon">
          <i className="fas fa-play" />
        </span>
      </button>
      <button
        className="button is-white is-pulled-right"
        title="delete"
        onClick={props.onDeleteClick}
      >
        <span className="icon has-text-danger">
          <i className="fas fa-trash" />
        </span>
      </button>
    </div>
  );
};
