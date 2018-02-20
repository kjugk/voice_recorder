import * as React from 'react';

interface BaseModalProps {
  onCloseClick?: () => void;
  show: boolean;
  children: React.ReactNode;
}

export const BaseModal: React.SFC<BaseModalProps> = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onCloseClick} />
      <div className="modal-content">
        <div className="box c-error-container">{props.children}</div>
      </div>
      <button onClick={props.onCloseClick} className="modal-close is-large" area-label="close" />
    </div>
  );
};
