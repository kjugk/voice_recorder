import * as React from 'react';

export class MicPermissionDeniedMessage extends React.Component {
  public render() {
    return(
      <article className="message is-warning">
        <div className="message-header">
          マイクの利用が許可されていません。
        </div>
        <div className="message-body">
          お使いのブラウザの「設定」ページから、マイクを許可してください。
        </div>
      </article>
    );
  }
}
