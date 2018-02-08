import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Types from '../types';
import * as articleActions from '../actions/articleActions';

import PlayerContainer from './PlayerContainer';

import { List } from '../components/articles/List';
import { NoArticleMessage } from '../components/messages/NoArticleMessage';
import { SnackBar } from '../components/SnackBar';
import { Loader } from '../components/Loader';

interface ArticleListContainerProps {
  message: Types.MessageState;
  articles: Types.ArticlesState;
  selectArticle: (id: string) => any;
  deleteArticle: (id: string) => any;
  fetchArticles: () => any;
}

class ArticleListContainer extends React.Component<ArticleListContainerProps> {
  public componentDidMount() {
    const { articles, fetchArticles } = this.props;

    if (!articles.isInitialized) {
      fetchArticles();
    }
  }

  public componentWillUnmount() {
    this.props.selectArticle('');
  }

  public render() {
    const { articles, selectArticle, deleteArticle, message } = this.props;

    return (
      <>
        {articles.isFetching && <Loader />}
        {!articles.isFetching && (
          <>
            {articles.items.length < 1 && <NoArticleMessage />}
            {articles.items.length >= 1 && (
              <List articles={articles} onItemPlay={selectArticle} onItemDelete={deleteArticle} />
            )}
          </>
        )}

        <Link className="button is-primary c-fab" title="start recording" to="/new">
          <span className="icon">
            <i className="fas fa-microphone" />
          </span>
        </Link>
        <SnackBar message={message.body} />
        <PlayerContainer />
      </>
    );
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    articles: state.articles,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    selectArticle: (id: string) => dispatch(articleActions.selectArticle(id)),
    deleteArticle: (id: string) => dispatch(articleActions.deleteArticle(id)),
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
