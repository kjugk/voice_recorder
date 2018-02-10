import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as recorderActions from '../actions/recorderActions';

import { Recorder } from '../components/recorder/Recorder';

interface RecorderContainerProps {
  media: Types.MediaState;
  recorder: Types.RecorderState;
  startRecording: () => any;
  stopRecording: () => any;
}

class RecorderContainer extends React.Component<RecorderContainerProps> {
  public render() {
    const { media, recorder, startRecording, stopRecording } = this.props;

    return (
      <Recorder
        media={media}
        duration={recorder.duration}
        isRecording={recorder.isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    media: state.media,
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
