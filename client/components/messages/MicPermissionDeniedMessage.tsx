import * as React from 'react';

export const MicPermissionDeniedMessage: React.SFC = () => {
  return (
    <article className="message">
      <div className="message-header">マイクが許可されていません</div>
      <div className="message-body">
        <p className="content has-text-centered is-size-1">
          <span className="icon">
            <i className="fas fa-microphone-slash" />
          </span>
        </p>
        <p className="content">お使いのブラウザの「設定」ページから、マイクを許可してください。</p>
      </div>
    </article>
  );
};
