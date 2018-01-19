import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import * as Types from '../types';
import * as articleActions from '../actions/articleActions';
import { ListItem } from '../components/articles/ListItem';
import Player from './PlayerContainer';

interface ArticleListProps {
  articles: Types.ArticlesState;
  selectArticle: (id: string) => any;
  fetchArticles: () => any;
}

class ArticleList extends React.Component<ArticleListProps> {
  public componentDidMount() {
    this.props.fetchArticles();
  }

  public render() {
    const { articles, selectArticle } = this.props;

    return (
      <React.Fragment>
        <ul>
          {articles.items.map((article) => {
            return (
              <ListItem
                key={article.id}
                id={article.id}
                title={article.title}
                onClick={selectArticle}
              />
            );
          })}
        </ul>
        <Link to="/new">new</Link>
        <Player />
      </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
