import * as React from 'react';

export const MicPermissionDeniedMessage: React.SFC = () => {
  return (
    <article className="message is-primary">
      <div className="message-header">Microphone is not permitted</div>
      <div className="message-body">
        <p className="content has-text-centered is-size-1">
          <span className="icon">
            <i className="fas fa-microphone-slash" />
          </span>
        </p>
        <p className="content has-text-centered">Please change borwser settings to permit microphone.</p>
      </div>
    </article>
  );
};
