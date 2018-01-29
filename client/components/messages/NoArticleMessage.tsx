import * as React from 'react';
import { Link } from 'react-router-dom';

export class NoArticleMessage extends React.Component {
  public render() {
    return (
      <article className="message is-warning">
        <div className="message-header">
          <p>There is no article yet.</p>
        </div>
        <div className="message-body">
          <p className="content">
            There is no article yet.
            <br />
            Lets' record your voices!!
          </p>
          <div className="has-text-centered">
            <Link to="/new" className="button is-warning is-large">
              Record New Article
            </Link>
          </div>
        </div>
      </article>
    );
  }
}
