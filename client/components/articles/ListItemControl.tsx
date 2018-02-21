import * as React from 'react';
import { MouseEvent } from 'react';

interface ListItemControlProps {
  onPlayClick: (evt: MouseEvent<HTMLElement>) => void;
  onDeleteClick: (evt: MouseEvent<HTMLElement>) => void;
}

export const ListItemControl: React.SFC<ListItemControlProps> = (props) => {
  return (
    <>
      <div className="card-footer-item">
        <button className="button is-white" title="play" onClick={props.onPlayClick}>
          <span className="icon">
            <i className="fas fa-play" />
          </span>
        </button>
      </div>
      <div className="card-footer-item">
        <button className="button is-white" title="delete" onClick={props.onDeleteClick}>
          <span className="icon has-text-danger">
            <i className="fas fa-trash" />
          </span>
        </button>
      </div>
    </>
  );
};
