import * as React from 'react';
import { formatDurationToTime } from '../../lib/Player';
import * as Types from '../../types';
import * as classnames from 'classnames';
import { Visualizer } from './Visualizer/Visualizer';
import { RECORDING_LIMIT } from '../../lib/Recorder';

interface RecorderProps {
  duration: number;
  isRecording: boolean;
  media: Types.MediaState;
  startRecording: () => any;
  stopRecording: () => any;
}

export class Recorder extends React.Component<RecorderProps> {
  public render() {
    const { isRecording, media, duration } = this.props;
    const timerClassName = classnames('c-recorder-timer', {
      'has-text-danger': isRecording
    });

    const tickerClassName = classnames('c-recorder-ticker', {
      inactive: !isRecording,
      active: isRecording
    });

    return (
      <>
        <div className={timerClassName}>
          <div>{formatDurationToTime(duration / 1000)}</div>
          <span style={{marginRight: '1rem', fontWeight: 'normal'}}>/</span>
          <div>{formatDurationToTime(RECORDING_LIMIT / 1000)}</div>
        </div>

        <Visualizer stream={media.stream} isRecording={isRecording} />

        <div className="columns is-mobile  has-align-center" style={{marginTop: '.6rem'}}>
          <div className="column is-narrow">{this.renderButton()}</div>
          <div className="column is-narrow is-paddingless">
            <span className={tickerClassName}>Now Recording</span>
          </div>
        </div>
      </>
    );
  }

  private renderButton() {
    const { isRecording, startRecording, stopRecording } = this.props;

    if (isRecording) {
      return (
        <button
          className="button is-danger is-large"
          onClick={stopRecording}
          title="stop recording"
        >
          <span className="icon">
            <i className="fas fa-stop" />
          </span>
        </button>
      );
    } else {
      return (
        <button
          className="button is-primary is-large"
          onClick={startRecording}
          title="start recording"
        >
          <span className="icon">
            <i className="fas fa-play" />
          </span>
        </button>
      );
    }
  }
}
