import * as localforage from 'localforage';

export const fetchArticles = () => {
  return new Promise((resolve) => {
    localforage.getItem('articles').then((articles) => {
      if (!articles) {
        articles = [];
      }
      resolve(articles);
    });
  });
};

export const saveArticle = (id: string, title: string, audio: any, duration: number, createdAt: Date) => {
  return new Promise((resolve) => {
    localforage.getItem('articles').then((items: any) => {
      if (!items) {
        items = [];
      }
      items = [{ id, title, audio, duration, createdAt}, ...items];
      localforage.setItem('articles', items).then(() => {
        resolve();
      });
    });
  });
};

export const deleteArticle = (id: string) => {
  return new Promise((resolve) => {
    localforage.getItem('articles').then((items: any) => {
      const newItems = items.filter((item: any) => item.id !== id);
      localforage.setItem('articles', newItems).then(() => {
        resolve(newItems);
      });
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
    localforage.getItem('articles').then((items: any) => {
      const article = items.find((item: any) => item.id === id);
      const fr = new FileReader();
      fr.readAsArrayBuffer(article.audio);

      fr.onload = () => {
        resolve(fr.result);
      };
    });
  });
};
