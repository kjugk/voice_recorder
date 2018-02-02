export interface AppState {
  articles: ArticlesState;
  player: PlayerState;
  articleForm: ArticleFormState;
  recorder: RecorderState;
  media: MediaState;
  message: MessageState;
}

export interface MessageState {
  body: string;
}

export interface MediaState {
  micPremitted: boolean;
}

export interface ArticlesState {
  selectedId?: string;
  items: ArticleItemState[];
  isFetching: boolean;
}

export interface ArticleFormState {
  title: string;
  submitted: boolean;
  audio: any;
  duration: number;
}

export interface ArticleItemState {
  id: string;
  title: string;
  duration: number;
  createdAt: Date;
}

export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  curPos: number;
}

export interface RecorderState {
  isRecording: boolean;
  recordingCompleted?: boolean;
}
