import * as React from 'react';
import * as types from '../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticlesScreenContainer from './ArticlesScreenContainer';
import RecordingScreenContainer from './RecordingScreenContainer';
import HomeScreenContainer from './HomeScreenContainer';
import { Header } from '../components/layout/Header';
import { ErrorMessageModal } from '../components/Modal/ErrorMessageModal';
import { Snackbar } from '../components/Snackbar/Snackbar';
import * as messageActions from '../actions/messageActions';
import { Footer } from '../components/layout/Footer';

interface AppProps {
  message: types.MessageState;
  onErrorMessageClose(): any;
}

class App extends React.Component<AppProps> {
  public render() {
    const { message, onErrorMessageClose } = this.props;

    return (
      <Router>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          <Header />
          <div style={{flex: 1}}>
            <Route exact path="/" component={HomeScreenContainer} />
            <Route exact path="/articles" component={ArticlesScreenContainer} />
            <Route exact path="/articles/new" component={RecordingScreenContainer} />
          </div>
          <Footer />
          <Snackbar message={message.body} />
          <ErrorMessageModal message={message.errorMessage} onCloseClick={onErrorMessageClose} />
        </div>
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
