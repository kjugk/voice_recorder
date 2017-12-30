import { ArticleFormState } from './states';
export interface AppState {
  articles: ArticlesState;
  player: PlayerState;
  articleForm: ArticleFormState;
}

export interface ArticlesState {
  selectedId?: number;
  items: ArticleItemState[];
  isFetching: boolean;
}

export interface ArticleFormState {
  title: string;
  submitted: boolean;
}

export interface ArticleItemState {
  id: number;
  title: string;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  curPos: number;
}
