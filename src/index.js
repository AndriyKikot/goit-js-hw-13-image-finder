import './styles.css';
import './scss/normalize.scss';
import 'material-design-icons/iconfont/material-icons.css';

import updateGalleryMarkup from './js/updateGalleryMarkup';

import { refs } from './js/refs.js';
import apiService from './js/apiService.js';
import loadMoreBtn from './js/loadMoreBtn.js';
import error from './js/pnotify.js'


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
        if (hits.length > 0) {
            updateGalleryMarkup(hits);
            loadMoreBtn.show();
            loadMoreBtn.enable();
            window.scrollTo({
                top: 10000,
                behavior: 'smooth'
            });
        } else {
            error('Sorry. No results were found for your search!');
            loadMoreBtn.hide();
        }
    }).catch(error => (console.log(error)));
};
function clearGalleryList() {
    refs.galleryList.innerHTML = '';
};
