import * as React from 'react';
import * as Types from '../types';
import { connect, Dispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ArticleIndexContainer from '../containers/ArticleIndexContainer';
import ArticleNewContainer from '../containers/ArticleNewContainer';

import { Header } from '../components/layout/Header';
import { MainSection } from '../components/layout/MainSection';
import { Footer } from '../components/layout/Footer';
import { ErrorMessageModal } from '../components/modal/ErrorMessageModal';

import * as messageActions from '../actions/messageActions';

interface AppProps {
  errorMessage: string;
  onErrorMessageClose: () => any;
}

class App extends React.Component<AppProps> {
  public render() {
    return (
      <Router>
        <>
          <Header />
          <MainSection>
            <Route exact path="/" component={ArticleIndexContainer} />
            <Route exact path="/new" component={ArticleNewContainer} />
          </MainSection>
          <Footer />
          <ErrorMessageModal
            message={this.props.errorMessage}
            onCloseClick={this.props.onErrorMessageClose.bind(this)}
          />
        </>
      </Router>
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    errorMessage: state.message.errorMessage
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    onErrorMessageClose: () => dispatch(messageActions.setErrorMessage(''))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
