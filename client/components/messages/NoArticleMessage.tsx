import * as React from 'react';
import { Link } from 'react-router-dom';

export const NoArticleMessage: React.SFC = () => {
  return (
    <article className="message">
      <div className="message-body">
        <p className="content">
          ここで、アプリの説明と、サーバーに保存しないなどの注意書きをする。
          <br/>
          サポートブラウザを出してもいいかも。(articleがある場合は、modalに移すとかいいかも)
          <br />
          サーバーにでーた保存しないよ
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
};