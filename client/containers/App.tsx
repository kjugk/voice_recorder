import * as React from 'react';
import ArticleList from '../containers/ArticleList';
import ArticleForm from '../containers/ArticleForm';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Router>
          <>
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/new" component={ArticleForm} />
          </>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
