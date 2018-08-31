import * as React from 'react';
import * as types from '../types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticleIndexContainer from '../containers/ArticleIndexContainer';
import ArticleNewContainer from '../containers/ArticleNewContainer';
import HomeContainer from '../containers/HomeContainer';
import { Header } from '../components/layout/Header';
import { ErrorMessageModal } from '../components/modal/ErrorMessageModal';
import { SnackBar } from '../components/SnackBar';
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
          <Route exact path="/" component={HomeContainer} />
          <Route exact path="/articles" component={ArticleIndexContainer} />
          <Route exact path="/articles/new" component={ArticleNewContainer} />
          <SnackBar message={message.body} />
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
