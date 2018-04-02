import * as React from 'react';
import { Link } from 'react-router-dom';

export class WelcomeMessage extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <div
          style={{
            height: 'calc(100% - 3.25rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="has-text-centered">
            <h3 className="has-text-primary" style={{ fontSize: '3.6rem' }}>
              Record your voice anywhere
            </h3>
            <p className="subtitle is-5" style={{ marginTop: '.1rem' }}>
              A simple voice recorder app for modern browsers.
            </p>
            <Link to="/articles/new">
              <button type="button" className="button is-primary is-large">
                <span className="icon">
                  <i className="fas fa-microphone" />
                </span>
                <span>Start Recording</span>
              </button>
            </Link>
          </div>
        </div>

          <div className="has-text-centered" style={{background: '#eee', padding: '1rem 0'}}>
            <h3 className="title is-3">No data will be saved into server</h3>
            <p>
              All your recorded data is saved into browser storage instead of server.
              <br />
              So you can use this app safely without any registration or login.
            </p>
          </div>

        <div className="container">
          <div className="has-text-centered">
            <h5 className="title is-5">Supporting browsers</h5>
            <div className="columns">
              <div className="column">
                <h6 className="title is-6">Desktop</h6>
                <ul>
                  <li>
                    <span className="icon">
                      <i className="fab fa-edge" />
                    </span>
                    Latest Edge
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fab fa-firefox" />
                    </span>
                    Latest Firefox
                  </li>
                  <li>
                    <span className="icon">
                      <i className="fab fa-chrome" />
                    </span>
                    Latest Chrome
                  </li>
                </ul>
              </div>
              <div className="column">
                <h6 className="title is-6">Mobile</h6>
                <ul>
                  <li>
                    <span className="icon">
                      <i className="fab fa-android" />
                    </span>
                    Android 7+ Chrome
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
