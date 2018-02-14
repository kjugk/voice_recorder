import * as React from 'react';

interface ErrorModalProps {
  message: string;
  onCloseClick: () => any;
}

export const ErrorModal: React.SFC<ErrorModalProps> = (props) => {
  if (props.message === '') {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      <div className="modal-content">{props.message}</div>
      <button onClick={props.onCloseClick} className="modal-close is-large" area-label="close" />
    </div>
  );
};
