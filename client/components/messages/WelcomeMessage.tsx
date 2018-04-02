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
            <h2 className="c-hero-title has-text-primary">
              Record your voice anywhere
            </h2>
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

        <section className="section has-text-centered" style={{ background: 'whitesmoke' }}>
          <h3 className="title is-3">No data will be saved into server</h3>
          <p>
            All your recorded data is saved into browser storage instead of server.
            <br />
            So you can use this app safely without any registration or login.
          </p>
        </section>

        <section className="section has-text-centered">
          <h3 className="title is-3">Supporting browsers</h3>
          <div>
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

          <div style={{marginTop: '1rem'}}>
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
        </section>
      </React.Fragment>
    );
  }
}
