// TODO: mic入力のvisualizeを作る
import * as React from 'react';

interface RecorderProps {
  isRecording: boolean;
  startRecording: () => any;
  stopRecording: () => any;
}

export class Recorder extends React.Component<RecorderProps> {
  public render() {
    return <div>{this.renderButton()}</div>;
  }

  private renderButton() {
    const { isRecording, startRecording, stopRecording } = this.props;

    if (isRecording) {
      return (
        <button className="button is-primary is-large" onClick={stopRecording}>
          Stop Recording
        </button>
      );
    } else {
      return (
        <button className="button is-danger is-large" onClick={startRecording}>
          Start Recording
        </button>
      );
    }
  }
}
