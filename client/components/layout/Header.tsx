import * as React from 'react';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item c-brand">
              <h1 className="has-text-weight-bold">Voice Recorder</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
