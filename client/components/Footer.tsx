import * as React from 'react';

export class Footer extends React.Component {
  public render() {
    return (
      <footer className="footer">
        <div className="container">
          <a href="https://bulma.io">
            <img src="/images/made-with-bulma.png" alt="Made with Bulma" width="128" height="24" />
          </a>
        </div>
      </footer>
    );
  }
}
