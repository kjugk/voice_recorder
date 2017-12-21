import * as React from 'react';
import { connect } from 'react-redux';
import { AppState, ArticlesState } from '../types';

interface AppProps {
  articles: ArticlesState;
}

class App extends React.Component<AppProps> {
  public render() {
    const { articles } = this.props;

    return (
      <React.Fragment>
        {articles.items}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    articles: state.articles
  };
};

export default connect(mapStateToProps)(App);
