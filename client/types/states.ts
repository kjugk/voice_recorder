import { ArticleFormState } from './states';
export interface AppState {
  articles: ArticlesState;
  player: PlayerState;
  articleForm: ArticleFormState;
}

export interface ArticlesState {
  selectedId?: string;
  items: ArticleItemState[];
  isFetching: boolean;
}

export interface ArticleFormState {
  title: string;
  submitted: boolean;
}

export interface ArticleItemState {
  id: string;
  title: string;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  curPos: number;
}
