import * as React from 'react';

export class MicPermissionDeniedMessage extends React.Component {
  public render() {
    return(
      <article className="message is-warning">
        <div className="message-header">
          <span>マイクの利用が許可されていません。</span>
          <span className="icon is-large">
            <span className="fa-stack fa-lg">
              <i className="fas fa-microphone fa-stack-1x"></i>
              <i className="fas fa-ban fa-stack-2x has-text-danger"></i>
            </span>
          </span>
        </div>
        <div className="message-body">
          <p className="content">
            お使いのブラウザの「設定」ページから、マイクを許可してください。
          </p>
        </div>
      </article>
    );
  }
}
