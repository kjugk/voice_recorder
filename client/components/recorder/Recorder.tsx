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
        <button className="button is-primary" onClick={stopRecording}>
          stop
        </button>
      );
    } else {
      return (
        <button className="button is-danger" onClick={startRecording}>
          start
        </button>
      );
    }
  }
}
