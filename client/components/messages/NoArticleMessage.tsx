import * as React from 'react';
import { Link } from 'react-router-dom';

export class NoArticleMessage extends React.Component {
  public render() {
    return (
      <article className="message">
        <div className="message-header">
          <p>There is no article yet.</p>
        </div>
        <div className="message-body">
          <p className="content">
            ここで、アプリの説明と、サーバーに保存しないなどの注意書きをする。
            サポートブラウザを出してもいいかも。(articleがある場合は、modalに移すとかいいかも)
            <br />
            There is no article yet.
            <br />
            Lets' record your voices!!
          </p>
          <div className="has-text-centered">
            <Link to="/new" className="button is-primary is-large">
              <span className="icon">
                <i className="fas fa-microphone" />
              </span>
              <span>Record New Article</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }
}
