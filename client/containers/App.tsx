import * as React from 'react';
import ArticleList from '../containers/ArticleList';
import Player from './PlayerContainer';

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <ArticleList />
        <Player />
      </React.Fragment>
    );
  }
}

export default App;
