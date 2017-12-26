import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as Types from '../types';
import * as ArticleActions from '../actions/ArticleActions';
import { ListItem } from '../components/articles/ListItem';

interface ArticleListProps {
  articles: Types.ArticlesState;
  selectArticle: (id: number) => any;
  fetchArticles: () => any;
}

class ArticleList extends React.Component<ArticleListProps> {
  constructor(props: ArticleListProps) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  public componentDidMount() {
    this.props.fetchArticles();
  }

  public render() {
    const { articles } = this.props;

    return (
      <ul>
        {articles.items.map((article) => {
          return (
            <ListItem
              key={article.id}
              id={article.id}
              title={article.title}
              onClick={this.handleSelect}
            />
          );
        })}
      </ul>
    );
  }

  private handleSelect(id: number): void {
    this.props.selectArticle(id);
  }
}

const mapStateToProps = (state: Types.AppState) => {
  return {
    articles: state.articles
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    selectArticle: (id: number) => dispatch(ArticleActions.selectArticle(id)),
    fetchArticles: () => dispatch(ArticleActions.fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
