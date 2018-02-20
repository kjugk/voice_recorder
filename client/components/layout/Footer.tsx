import * as React from 'react';

export class Footer extends React.Component {
  public render() {
    return (
      <footer className="footer">
        <div className="container">
          <h5 className="title is-5">Voice Recorder(Ver 1.0.0)</h5>
          <div><a href="https://github.com/kjugk/voice_recorder/issues">File a bug report.</a></div>
          <div className="u-margin-m-t">
            <a href="https://bulma.io">
              <img src="/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24" />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
