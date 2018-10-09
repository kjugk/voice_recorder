import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import { Redirect } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/layout/Footer';

interface ArticleIndexContainerProps {
  articles: Types.ArticlesState;
  fetchArticles: () => any;
}

class HomeScreenContainer extends React.Component<ArticleIndexContainerProps> {
  public componentDidMount() {
    const { articles, fetchArticles } = this.props;

    if (!articles.isInitialized) {
      fetchArticles();
    }
  }

  public render() {
    const { articles } = this.props;

    if (!articles.isInitialized) {
      return null;
    }

    if (articles.items.length >= 1) {
      return <Redirect to="/articles" />;
    }

    return (
      <>
        <Helmet>
          <title>Voice Recorder</title>
        </Helmet>
        <Home />
      </>
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    articles: state.articles
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);
