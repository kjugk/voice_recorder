import * as React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item c-brand">
              <Link to="/">
                <h2 className="has-text-white">Voice Recorder</h2>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
