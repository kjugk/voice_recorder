export interface FSA<P> {
  type: string;
  payload: P;
  error?: boolean;
  meta?: object;
}

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
  errorMessage: string;
}

export enum MediaPermissionState {
  NOT_CHECKED,
  PERMITTED,
  DENIED,
  NOT_SUPPORTED
}

export interface MediaState {
  permission: MediaPermissionState;
  stream?: MediaStream;
}

export interface ArticlesState {
  selectedId?: string;
  items: ArticleItemState[];
  isFetching: boolean;
  isInitialized: boolean;
}

export interface ArticleFormState {
  title: string;
  submitted: boolean;
  audio: any;
  duration: number;
  size: number;
}

export interface ArticleItemState {
  id: string;
  title: string;
  duration: number;
  createdAt: Date;
  size: number;
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
  duration: number;
  isWaiting: boolean;
}
