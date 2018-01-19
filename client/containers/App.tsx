import * as React from 'react';
import ArticleListContainer from '../containers/ArticleListContainer';
import ArticleFormContainer from '../containers/ArticleFormContainer';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  public render() {
    return (
      <>
        <Router>
          <>
            <Route exact path="/" component={ArticleListContainer} />
            <Route exact path="/new" component={ArticleFormContainer} />
          </>
        </Router>
      </>
    );
  }
}

export default App;
