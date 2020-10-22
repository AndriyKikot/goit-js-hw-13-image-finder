import './styles.css';
import './scss/normalize.scss';
import 'material-design-icons/iconfont/material-icons.css';

import apiService from './js/apiService.js';
import updateGalleryMarkup from './js/updateGalleryMarkup';

import { refs } from './js/refs.js';


refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value;

    refs.galleryList.innerHTML = '';

    apiService.resetPage();

    fetchImages();

    form.reset();
});

refs.loadMoreBtn.addEventListener('click', fetchImages);

function fetchImages() {
    refs.loadMoreBtn.classList.add('is-hidden');
    refs.loader.classList.remove('is-hidden');

    refs.loadMoreBtn.disabled = true;

    apiService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
        refs.loadMoreBtn.disabled = false;

        window.scrollTo({
            top: 10000,
            behavior: 'smooth'
        });

        refs.loadMoreBtn.classList.remove('is-hidden');
    }).finally(() => {
        refs.loader.classList.add('is-hidden');
    });
};
