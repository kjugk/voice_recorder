import * as React from 'react';
import { formatDurationToTime } from '../../lib/Player';

interface RecorderProps {
  duration: number;
  isRecording: boolean;
  startRecording: () => any;
  stopRecording: () => any;
}

export class Recorder extends React.Component<RecorderProps> {
  public render() {
    return (
      <div className="columns is-mobile  has-align-center">
        <div className="column is-narrow">
          {this.renderButton()}
        </div>
        <div className="column is-narrow is-paddingless">
          <span className="c-recorder-timer">
            {formatDurationToTime(this.props.duration / 1000)}
          </span>
        </div>
      </div>
    );
  }

  private renderButton() {
    const { isRecording, startRecording, stopRecording } = this.props;

    if (isRecording) {
      return (
        <button className="button is-danger c-rec-btn" onClick={stopRecording}>
          <span className="icon">
            <i className="fas fa-stop" />
          </span>
        </button>
      );
    } else {
      return (
        <button className="button is-primary c-rec-btn" onClick={startRecording}>
          <span className="icon">
            <i className="fas fa-play" />
          </span>
        </button>
      );
    }
  }
}
