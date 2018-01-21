import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as recorderActions from '../actions/recorderActions';

import { Recorder } from '../components/recorder/Recorder';

interface RecorderContainerProps {
  recorder: Types.RecorderState;
  startRecording: () => any;
  stopRecording: () => any;
}

class RecorderContainer extends React.Component<RecorderContainerProps> {
  public render() {
    const { recorder, startRecording, stopRecording } = this.props;

    return (
      <Recorder
        isRecording={recorder.isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    recorder: state.recorder
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    startRecording: () => {
      dispatch(recorderActions.startRecording());
    },
    stopRecording: () => {
      dispatch(recorderActions.stopRecording());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecorderContainer);
