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

export const saveArticle = (id: string, title: string) => {
  return new Promise((resolve) => {
    localforage.getItem('articles').then((items: any) => {
      if (!items) {
        items = [];
      }
      items = [{ id, title }, ...items];
      localforage.setItem('articles', items).then(() => {
        resolve();
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
