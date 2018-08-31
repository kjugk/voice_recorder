import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import { Redirect } from 'react-router-dom';
import { WelcomeMessage } from '../components/messages/WelcomeMessage';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/layout/Footer';

interface ArticleIndexContainerProps {
  articles: Types.ArticlesState;
  fetchArticles: () => any;
}

class HomeContainer extends React.Component<ArticleIndexContainerProps> {
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
      <div style={{height: '100%'}}>
        <Helmet>
          <title>Voice Recorder</title>
        </Helmet>
        <WelcomeMessage />
        <Footer />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
