import * as React from 'react';
import { BaseModal } from './BaseModal';

interface ErrorMessageModalProps {
  message: string;
  onCloseClick?: () => any;
}

export const ErrorMessageModal: React.SFC<ErrorMessageModalProps> = (props) => {
  return (
    <BaseModal show={props.message !== ''} onCloseClick={props.onCloseClick}>
      <p className="content has-text-warning">
        <span className="icon">
          <i className="fas fa-3x fa-exclamation-triangle" />
        </span>
      </p>
      <h4 className="title is-4">{props.message}</h4>
    </BaseModal>
  );
};
