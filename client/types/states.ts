export interface AppState {
  articles: ArticlesState;
}

export interface ArticlesState {
  selectedId?: number;
  items: ArticleItemState[];
}

export interface ArticleItemState {
  id: number;
  title: string;
}
