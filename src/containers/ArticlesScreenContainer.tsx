import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as classnames from 'classnames';
import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import PlayerContainer from './PlayerContainer';
import { ArticleList } from '../components/article/ArticleList/ArticleList';
import { Loader } from '../components/Loader/Loader';
import { Fab } from '../components/Fab/Fab';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';

interface Props {
  articles: Types.ArticlesState;
  message: Types.MessageState;
  deleteArticle: (id: string) => any;
  fetchArticles: () => any;
  selectArticle: (id: string) => any;
}

class ArticlesScreenContainer extends React.Component<Props> {
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
    const { articles, selectArticle, deleteArticle } = this.props;
    const fabClassName = classnames({ shifted: !!articles.selectedId });

    if (articles.isInitialized && articles.items.length < 1) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Helmet>
          <title>Voice Recorder | Articles</title>
        </Helmet>

        <section className="section">
          <div className="container">
            {articles.isFetching && <Loader />}
            {!articles.isFetching && (
              <ArticleList articles={articles} onItemPlay={selectArticle} onItemDelete={deleteArticle} />
            )}

            <Fab className={fabClassName} linkTo="/articles/new" title="start recording" />
            <PlayerContainer />
          </div>
        </section>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesScreenContainer);
