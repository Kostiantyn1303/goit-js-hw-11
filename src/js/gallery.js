import { PixabeyAPI } from './pixabey-api';
import createGalleryCards from '../templates/gallery-cards.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.querySelector('.search-form');
const buttonSubmit = document.querySelector('.button-search');
const buttonLoadMore = document.querySelector('.load-more');
const galleryInfo = document.querySelector('.gallery');
const inputSearchForm = document.querySelector('.search-form__input');

const pixabeyAPI = new PixabeyAPI();

const handleSearchFormSubmit = async event => {
  event.preventDefault();
  pixabeyAPI.pages = 1;
  try {
    if (inputSearchForm.value === '') {
      return;
    }

    pixabeyAPI.q = inputSearchForm.value.trim();

    const { data } = await pixabeyAPI.fetchPhotos();

    galleryInfo.innerHTML = createGalleryCards(data.hits);

    if (data.hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      buttonLoadMore.classList.add('is-hidden');
      return;
    } else {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    if (pixabeyAPI.count > data.totalHits || data.hits === 0) {
      buttonLoadMore.classList.add('is-hidden');
      return;
    }

    buttonLoadMore.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

formEl.addEventListener('submit', handleSearchFormSubmit);

const handleLoadMoreBtnClick = async () => {
  pixabeyAPI.pages += 1;
  try {
    const { data } = await pixabeyAPI.fetchPhotos();
    if (data.hits.length < pixabeyAPI.count) {
      buttonLoadMore.classList.add('is-hidden');
    }
    galleryInfo.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
  } catch (error) {
    console.log(error);
  }
};

buttonLoadMore.addEventListener('click', handleLoadMoreBtnClick);
