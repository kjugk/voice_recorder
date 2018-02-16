import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as classnames from 'classnames';

import * as Types from '../types';
import * as articleActions from '../actions/articleActions';

import PlayerContainer from './PlayerContainer';
import { List } from '../components/articles/List';
import { NoArticleMessage } from '../components/messages/NoArticleMessage';
import { SnackBar } from '../components/SnackBar';
import { Loader } from '../components/Loader';
import { Fab } from '../components/Fab';
import { Helmet } from 'react-helmet';

interface ArticleListContainerProps {
  articles: Types.ArticlesState;
  message: Types.MessageState;
  deleteArticle: (id: string) => any;
  fetchArticles: () => any;
  selectArticle: (id: string) => any;
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
    const fabClassName = classnames({ shifted: !!articles.selectedId });

    return (
      <>
        <Helmet>
          <title>Voice Recorder</title>
        </Helmet>
        {articles.isFetching && <Loader />}
        {!articles.isFetching && (
          <>
            {articles.items.length < 1 && <NoArticleMessage />}
            {articles.items.length >= 1 && (
              <List articles={articles} onItemPlay={selectArticle} onItemDelete={deleteArticle} />
            )}
          </>
        )}

        <Fab className={fabClassName} linkTo="/new" title="start recording" />
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
    deleteArticle: (id: string) => dispatch(articleActions.deleteArticle(id)),
    fetchArticles: () => dispatch(articleActions.fetchArticles()),
    selectArticle: (id: string) => dispatch(articleActions.selectArticle(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
