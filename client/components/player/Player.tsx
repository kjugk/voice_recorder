import * as React from 'react';
import { Timer } from './Timer';

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

    if (isLoading) {
      return <div>Loading...</div>;
    }

    const progress = curPos / duration * 100;

    return (
      <section className="c-player is-fixed-bottom">
        <div className="container">
          <div className="columns is-mobile">
            <div className="column is-narrow">
              <h5 className="title is-6">{title}</h5>
            </div>
            <div className="column">
              <div className="is-pulled-right">
                <Timer curPos={curPos} duration={duration} />
              </div>
            </div>
          </div>

          <div className="columns is-mobile">
            <div className="column is-narrow">{this.renderButton()}</div>
            <div className="column c-player-progress">
              <progress className="progress is-primary" value={progress} max={100} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  private renderButton() {
    const { isPlaying, onPause, onPlay } = this.props;

    if (isPlaying) {
      return (
        <button className="button" onClick={onPause}>
          pause
        </button>
      );
    } else {
      return (
        <button className="button" onClick={onPlay}>
          play
        </button>
      );
    }
  }
}
