import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import { List } from '../components/articles/List';
import PlayerContainer from './PlayerContainer';
import { NoArticleMessage } from '../components/messages/NoArticleMessage';

interface ArticleListContainerProps {
  articles: Types.ArticlesState;
  selectArticle: (id: string) => any;
  deleteArticle: (id: string) => any;
  fetchArticles: () => any;
}

class ArticleListContainer extends React.Component<ArticleListContainerProps> {
  public componentDidMount() {
    this.props.fetchArticles();
  }

  public componentWillUnmount() {
    // player と 選択状態をリセットする
    this.props.selectArticle('');
  }

  public render() {
    const { articles, selectArticle, deleteArticle } = this.props;

    return (
      <>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            {articles.items.length < 1 && <NoArticleMessage />}
            <List articles={articles} onItemPlay={selectArticle} onItemDelete={deleteArticle} />
            <Link className="button is-primary" to="/new">
              new
            </Link>
          </div>
        </div>
        <PlayerContainer />
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
    selectArticle: (id: string) => dispatch(articleActions.selectArticle(id)),
    deleteArticle: (id: string) => dispatch(articleActions.deleteArticle(id)),
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
