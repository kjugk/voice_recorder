import * as React from 'react';

export class NoArticleMessage extends React.Component {
  public render() {
    return(
      <article className="message is-primary">
        <div className="message-header">
          <p>There is no article yet.</p>
        </div>
        <div className="message-body">
          There is no article yet.
        </div>
      </article>
    );
  }
}
