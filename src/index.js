import './styles.css';
import './scss/normalize.scss';
import 'material-design-icons/iconfont/material-icons.css';

import updateGalleryMarkup from './js/updateGalleryMarkup';

import { refs } from './js/refs.js';
import apiService from './js/apiService.js';
import loadMoreBtn from './js/loadMoreBtn.js';


refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.loadMoreBtn.addEventListener('click', fetchImages);

function searchFormSubmitHandler(event) {
    event.preventDefault();

    const form = event.currentTarget;
    apiService.query = form.elements.query.value;

    clearGalleryList();
    apiService.resetPage();
    fetchImages();
    form.reset();
};
function fetchImages() {

    loadMoreBtn.disable();

    apiService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
        loadMoreBtn.show();
        loadMoreBtn.enable();
        window.scrollTo({
            top: 10000,
            behavior: 'smooth'
        });

    });
};
function clearGalleryList() {
    refs.galleryList.innerHTML = '';
};
