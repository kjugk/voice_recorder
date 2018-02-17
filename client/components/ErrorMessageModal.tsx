import * as React from 'react';

interface ErrorMessageModalProps {
  message: string;
  onCloseClick?: () => any;
}

export const ErrorMessageModal: React.SFC<ErrorMessageModalProps> = (props) => {
  if (props.message === '') {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onCloseClick} />
      <div className="modal-content">
        <div className="box c-error-container">
          <p className="content has-text-warning">
            <span className="icon">
              <i className="fas fa-3x fa-exclamation-triangle" />
            </span>
          </p>
          <h4 className="title is-4">{props.message}</h4>
        </div>
      </div>
      <button onClick={props.onCloseClick} className="modal-close is-large" area-label="close" />
    </div>
  );
};
