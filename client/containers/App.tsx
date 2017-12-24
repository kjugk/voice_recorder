import * as React from 'react';
import ArticleList from '../containers/ArticleList';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <ArticleList />
      </React.Fragment>
    );
  }
}

export default App;
