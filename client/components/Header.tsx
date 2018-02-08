import * as React from 'react';

export class Header extends React.Component {
  public render() {
    return (
      <div className="navbar is-primary">
        <div className="container">
          <div className="navbar-brand">
            <div className="navbar-item">Voice Recorder</div>
          </div>
        </div>
      </div>
    );
  }
}
