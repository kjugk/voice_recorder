import * as React from 'react';
import ArticleListContainer from '../containers/ArticleListContainer';
import ArticleFormContainer from '../containers/ArticleFormContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <>
          <Header />
          <section className="section-main section">
            <div className="container">
              <Route exact path="/" component={ArticleListContainer} />
              <Route exact path="/new" component={ArticleFormContainer} />
            </div>
          </section>
          <Footer />
        </>
      </Router>
    );
  }
}

export default App;
