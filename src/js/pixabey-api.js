import axios from 'axios';
export class PixabeyAPI {
  API_KEY = '34948816-2e6b4dde3ba464b66c7123fee';
  BASE_URL = 'https://pixabay.com/api/';
  q = null;
  pages = 1;
  count = 40;

  async fetchPhotos() {
    try {
      return await axios.get(
        `${this.BASE_URL}?key=${this.API_KEY}&q=${this.q}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pages}&per_page=${this.count}`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
