import * as React from 'react';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item c-brand">Voice Recorder</div>
          </div>
        </div>
      </div>
    );
  }
}
