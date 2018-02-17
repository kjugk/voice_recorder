import * as React from 'react';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item c-brand">
              <h1 className="title is-1">Voice Recorder</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
