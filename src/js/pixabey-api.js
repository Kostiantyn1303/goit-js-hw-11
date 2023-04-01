export class pixabeyAPI {
  API_KEY = '34948816-2e6b4dde3ba464b66c7123fee';
  BASE_URL = 'https://pixabay.com/api/';
  q = null;
  pages = 1;
  count = 40;

  fetchPhotos() {
    return fetch(
      `${this.BASE_URL}?key${this.API_KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pages}&per-page=${this.count}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
