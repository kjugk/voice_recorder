import * as React from 'react';
import { Timer } from './Timer';
import { Loader, LoaderSize } from '../Loader';

export interface PlayerProps {
  isLoading: boolean;
  isPlaying: boolean;
  title: string;
  duration: number;
  curPos: number;
  onPlay: () => any;
  onPause: () => any;
}

export class Player extends React.Component<PlayerProps> {
  public render() {
    const { title, isLoading, isPlaying, curPos, duration } = this.props;
    const progress = curPos / duration * 100;

    return (
      <section className="c-player is-fixed-bottom">
        <div className="container">
          {isLoading && <Loader size={LoaderSize.SMALL} />}
          {!isLoading &&
            <>
              <div className="columns is-mobile is-1">
                <div className="column">
                  <h6 className="title is-6">{title}</h6>
                </div>
                <div className="column is-narrow">
                  <div className="is-pulled-right">
                    <Timer curPos={curPos} duration={duration} />
                  </div>
                </div>
              </div>

              <div className="columns is-mobile is-1">
                <div className="column is-narrow">{this.renderButton()}</div>
                <div className="column c-player-progress">
                  <progress
                    className="progress is-primary is-small is-radiusless"
                    max={100}
                    value={progress}
                  />
                </div>
              </div>
            </>
          }
        </div>
      </section>
    );
  }

  private renderButton() {
    const { isPlaying, onPause, onPlay } = this.props;

    if (isPlaying) {
      return (
        <button className="button is-white" onClick={onPause}>
          <span className="icon">
            <i className="fas fa-pause" />
          </span>
        </button>
      );
    } else {
      return (
        <button className="button is-white" onClick={onPlay}>
          <span className="icon">
            <i className="fas fa-play" />
          </span>
        </button>
      );
    }
  }
}
