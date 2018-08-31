import * as shortid from 'shortid';
import { VoiceRecorderDatabase } from '../db/VoiceRecorderDatabase';
const db = new VoiceRecorderDatabase();

export const fetchArticles = () => {
  return new Promise((resolve) => {
    resolve(
      db.articles
        .toCollection()
        .reverse()
        .sortBy('createdAt')
    );
  });
};

export const saveArticle = (title: string, audio: Blob, duration: number, createdAt: Date, size: number) => {
  const id = shortid.generate();
  if (title.trim() === '') {
    title = 'no title';
  }

  return new Promise((resolve, reject) => {
    db.articles
      .add({ id, title, audio, duration, createdAt, size })
      .then(() => {
        resolve(
          db.articles
            .toCollection()
            .reverse()
            .sortBy('createdAt')
        );
      })
      .catch((e) => {
        reject(e);
      });
  });
};

export const deleteArticle = (id: string) => {
  return new Promise((resolve, reject) => {
    db.articles
      .where('id')
      .equals(id)
      .delete()
      .then(() => {
        resolve(
          db.articles
            .toCollection()
            .reverse()
            .sortBy('createdAt')
        );
      })
      .catch((e) => {
        reject(e);
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
          resolve(fr.result as ArrayBuffer);
        };
        fr.readAsArrayBuffer(article.audio);
      });
  });
};
