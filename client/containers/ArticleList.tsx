import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as ArticleActions from '../actions/ArticleActions';
import { ListItem } from '../components/articles/ListItem';
import Player from './PlayerContainer';
import { Link } from 'react-router-dom';

interface ArticleListProps {
  articles: Types.ArticlesState;
  selectArticle: (id: string) => any;
  fetchArticles: () => any;
}

class ArticleList extends React.Component<ArticleListProps> {
  constructor(props: ArticleListProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchArticles();
  }

  public render() {
    const { articles } = this.props;

    return (
      <>
        <ul>
          {articles.items.map((article) => {
            return (
              <ListItem
                key={article.id}
                id={article.id}
                title={article.title}
                onClick={this.props.selectArticle}
              />
            );
          })}
        </ul>
        <Link to="/new">new</Link>
        <Player />
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
    selectArticle: (id: string) => dispatch(ArticleActions.selectArticle(id)),
    fetchArticles: () => dispatch(ArticleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
