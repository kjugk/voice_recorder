import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component {
  public render() {
    return (
      <>
        <div className="l-hero">
          <div className="has-text-centered">
            <h2 className="l-hero-title has-text-primary">Record your voice anywhere</h2>
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

        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column has-text-centered">
                <div className="media">
                  <figure className="media-left">
                    <span className="icon is-medium">
                      <i className="fas fa-2x fa-lock" />
                    </span>
                  </figure>
                  <div className="media-content">
                    <div className="content">
                      <h3 className="title is-3">Secure</h3>
                      <p>
                        All your recorded data is saved into browser storage instead of server.
                        <br />
                        So you can use this app safely without any registration or login.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="media">
                  <figure className="media-left">
                    <span className="icon is-medium">
                      <i className="fab fa-2x fa-chrome" />
                    </span>
                  </figure>

                  <div className="media-content">
                    <div className="content">
                      <h3 className="title is-3">Supporting browser</h3>
                      <div>
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
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
