export interface AppState {
  articles: ArticlesState;
  player: PlayerState;
}

export interface ArticlesState {
  selectedId?: number;
  items: ArticleItemState[];
  isFetching: boolean;
}

export interface ArticleItemState {
  id: number;
  title: string;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
}
