import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import { List } from '../components/articles/List';
import PlayerContainer from './PlayerContainer';

interface ArticleListContainerProps {
  articles: Types.ArticlesState;
  selectArticle: (id: string) => any;
  fetchArticles: () => any;
}

class ArticleListContainer extends React.Component<ArticleListContainerProps> {
  public componentDidMount() {
    this.props.fetchArticles();
  }

  public render() {
    const { articles, selectArticle } = this.props;

    return (
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <List articles={articles} onItemClick={selectArticle} />
          <Link className="button is-primary" to="/new">
            new
          </Link>
          <PlayerContainer />
        </div>
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
    selectArticle: (id: string) => dispatch(articleActions.selectArticle(id)),
    fetchArticles: () => dispatch(articleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
