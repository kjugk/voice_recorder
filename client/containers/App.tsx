import * as React from 'react';
import * as types from '../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticlesScreenContainer from './ArticlesScreenContainer';
import RecordingScreenContainer from './RecordingScreenContainer';
import HomeScreenContainer from './HomeScreenContainer';
import { Header } from '../components/layout/Header';
import { ErrorMessageModal } from '../components/modal/ErrorMessageModal';
import { Snackbar } from '../components/Snackbar/Snackbar';
import * as messageActions from '../actions/messageActions';

interface AppProps {
  message: types.MessageState;
  onErrorMessageClose(): any;
}

class App extends React.Component<AppProps> {
  public render() {
    const { message, onErrorMessageClose } = this.props;

    return (
      <Router>
        <>
          <Header />
          <Route exact path="/" component={HomeScreenContainer} />
          <Route exact path="/articles" component={ArticlesScreenContainer} />
          <Route exact path="/articles/new" component={RecordingScreenContainer} />
          <Snackbar message={message.body} />
          <ErrorMessageModal message={message.errorMessage} onCloseClick={onErrorMessageClose} />
        </>
      </Router>
    );
  }
}

const mapStateToProps = (state: types.AppState) => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators(
    {
      onErrorMessageClose: () => messageActions.setErrorMessage('')
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
