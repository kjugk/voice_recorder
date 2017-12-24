import * as React from 'react';
import { AppState, ArticlesState, ArticleItemState } from '../types/index';
import { connect } from 'react-redux';

interface PlayerProps {
  articles: ArticlesState;
}

class Player extends React.Component<PlayerProps> {
  public render() {
    const selected = getSelectedArticle(this.props.articles.items, this.props.articles.selectedId);

    if (selected) {
      return <div>{selected.title}</div>;
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    articles: state.articles
  };
};

const getSelectedArticle = (
  articles: ArticleItemState[],
  selectedId: number | undefined
): ArticleItemState | undefined => {
  return articles.find((article) => article.id === selectedId);
};

export default connect(mapStateToProps)(Player);
