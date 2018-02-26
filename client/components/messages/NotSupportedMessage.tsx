import * as React from 'react';

export const NotSupportedMessage: React.SFC = () => {
  return (
    <article className="message is-primary">
      <div className="message-header">Recording functions is not supported</div>
      <div className="message-body">
        <p className="content has-text-centered is-size-1">
          <span className="icon">
            <i className="fas fa-microphone-slash" />
          </span>
        </p>
        <p className="content has-text-centered">
          'Sorry, your browser doesn\'t support recording functions.'
        </p>
      </div>
    </article>
  );
};
