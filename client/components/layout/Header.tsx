import * as React from 'react';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item c-brand">
              <h2 className="title is-2">Voice Recorder</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
