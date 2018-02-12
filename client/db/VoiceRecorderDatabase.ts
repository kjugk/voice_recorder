import Dexie from 'dexie';

interface Article {
  id: string;
  title: string;
  audio: Blob;
  duration: number;
  createdAt: Date;
}

export class VoiceRecorderDatabase extends Dexie {
  public articles: Dexie.Table<Article, string>;

  constructor() {
    super('VoiceRecorderDatabase');
    this.version(1).stores({
      articles: 'id,title,audio,duration,createdAt'
    });
  }
}
