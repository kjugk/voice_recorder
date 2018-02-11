import { VoiceRecorderDatabase } from '../db/VoiceRecorderDatabase';
const db = new VoiceRecorderDatabase();

export const fetchArticles = () => {
  return new Promise((resolve) => {
    resolve(db.articles.toArray());
  });
};

export const saveArticle = (
  id: string,
  title: string,
  audio: Blob,
  duration: number,
  createdAt: Date
) => {
  if (title.trim() === '') {
    title = 'no title';
  }

  return new Promise((resolve) => {
    db.articles.put({ id, title, audio, duration, createdAt }).then(() => {
      resolve(db.articles.toArray());
    });
  });
};

export const deleteArticle = (id: string) => {
  return new Promise((resolve) => {
    db.articles
      .where('id')
      .equals(id)
      .delete()
      .then(() => {
        resolve(db.articles.toArray());
      });
  });
};

export const getTrack = (url: string) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send();
  });
};

export const getTrackFromStorage = (id: string) => {
  return new Promise((resolve) => {
    db.articles
      .where('id')
      .equals(id)
      .first()
      .then((article: any) => {
        const fr = new FileReader();
        fr.onload = () => {
          resolve(fr.result);
        };
        fr.readAsArrayBuffer(article.audio);
      });
  });
};
