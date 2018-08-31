import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as recorderActions from '../actions/recorderActions';
import { Recorder } from '../components/recorder/Recorder';
import { Loader } from '../components/Loader';

interface RecorderContainerProps {
  media: Types.MediaState;
  recorder: Types.RecorderState;
  startRecording: () => any;
  stopRecording: () => any;
}

class RecorderContainer extends React.Component<RecorderContainerProps> {
  public render() {
    const { media, recorder, startRecording, stopRecording } = this.props;

    if (recorder.isWaiting) {
      return <Loader text="Audio file processing..." />;
    }

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

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      startRecording: () => recorderActions.startRecording(),
      stopRecording: () => recorderActions.stopRecording()
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecorderContainer);
