import * as React from 'react';
import * as types from '../types';
import { connect, Dispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ArticleIndexContainer from '../containers/ArticleIndexContainer';
import ArticleNewContainer from '../containers/ArticleNewContainer';
import HomeContainer from '../containers/HomeContainer';

import { Header } from '../components/layout/Header';
import { MainSection } from '../components/layout/MainSection';
import { Footer } from '../components/layout/Footer';
import { ErrorMessageModal } from '../components/modal/ErrorMessageModal';
import { SnackBar } from '../components/SnackBar';

import * as messageActions from '../actions/messageActions';

interface AppProps {
  message: types.MessageState;
  onErrorMessageClose: () => any;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <Router>
        <>
          <Header />
          <Route exact path="/" component={HomeContainer} />
          <MainSection>
            <Route exact path="/articles" component={ArticleIndexContainer} />
            <Route exact path="/articles/new" component={ArticleNewContainer} />
          </MainSection>
          <SnackBar message={this.props.message.body} />
          <ErrorMessageModal
            message={this.props.message.errorMessage}
            onCloseClick={this.props.onErrorMessageClose.bind(this)}
          />
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

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onErrorMessageClose: () => dispatch(messageActions.setErrorMessage(''))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
