import * as React from 'react';

export const NoArticleMessage: React.SFC = () => {
  return (
    <div>
      <p className="title is-3 has-text-primary">Record your voice anywhere.</p>
      <p className="subtitle is-5">A simple voice recorder app for modern browsers. </p>

      <div className="columns" style={{marginTop: '3.8rem'}}>
        <div className="column">
          <h5 className="title is-5">No data saved to server</h5>
          <p>
            All your recorded data is saved into your browser storage instead of server.
            <br/>
            So you can use this app safely without any registration or login.
          </p>
        </div>
        <div className="column">
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
    </div>
  );
};
