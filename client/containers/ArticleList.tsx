import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState, ArticlesState } from '../types';
import { ListItem } from '../components/articles/ListItem';

import { selectArticle } from '../actions/ArticleActions';

interface ArticleListProps {
  articles: ArticlesState;
  selectArticle: (id: number) => any;
}

class ArticleList extends React.Component<ArticleListProps> {
  constructor(props: ArticleListProps) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
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

  private handleSelect(id: number) {
    this.props.selectArticle(id);
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    articles: state.articles
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    selectArticle: (id: number) => dispatch(selectArticle(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);