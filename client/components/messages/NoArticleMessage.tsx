import * as React from 'react';
import * as classnames from 'classnames';

interface ExampleState {
  height: number;
  pulled: boolean;
}

export class NoArticleMessage extends React.Component<any, ExampleState> {
  private titleContainer: HTMLDivElement | null;

  constructor(props: any) {
    super(props);

    this.state = { height: 1000, pulled: false };
  }

  public componentDidMount() {
    this.setState({ height: window.innerHeight });
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  public componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  private handleScroll() {
    if (!this.state.pulled) {
      this.setState({ pulled: true });
    }
  }

  public render() {
    const { pulled } = this.state;
    const hogeClass = classnames('columns hoge', { shifted: !pulled });

    return (
      <React.Fragment>
        <div
          ref={(d) => {
            this.titleContainer = d;
          }}
          style={{
            marginTop: '-140px',
            // height: this.state.pulled ? this.state.height - 300 : this.state.height, ここの高さは、device height から　計算する
            height: this.state.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transition: 'all .4s ease-in-out'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p className="has-text-primary" style={{ fontSize: '3.6rem' }}>
              Record your voice anywhere.
            </p>
            <p className="subtitle is-5" style={{ marginTop: '.1rem' }}>
              A simple voice recorder app for modern browsers.{' '}
            </p>
            <button className="button is-primary is-large">Start Recording</button>
          </div>
          {!this.state.pulled && (
            <div
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center' }}
            >
              <button onClick={() => this.setState({ pulled: true })} className="button is-primary">
                pull
              </button>
            </div>
          )}
        </div>

        <div className={hogeClass}>
          <div className="column">
            <h5 className="title is-5">No data will be saved into server</h5>
            <p>
              All your recorded data is saved into browser storage instead of server.
              <br />
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
      </React.Fragment>
    );
  }
}
