import * as React from 'react';
import ArticleListContainer from '../containers/ArticleListContainer';
import ArticleFormContainer from '../containers/ArticleFormContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header } from '../components/Header';
import { MainSection } from '../components/layout/MainSection';
import { Footer } from '../components/Footer';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <>
          <Header />
          <MainSection>
            <Route exact path="/" component={ArticleListContainer} />
            <Route exact path="/new" component={ArticleFormContainer} />
          </MainSection>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
