export * from './states';

export interface FSA<P> {
  type: string;
  payload: P;
  error?: boolean;
  meta?: object;
}
