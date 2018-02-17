import * as React from 'react';

export class Footer extends React.Component {
  public render() {
    return (
      <footer className="footer">
        <div className="container">
          <div><b>Voice Recorder Ver 1.0.0</b></div>
          <div>The source code is licensed <a href="https://www.webrtc-experiment.com/licence/">MIT</a>.</div>
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
