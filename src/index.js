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
    form.reset();

    apiService.resetPage();

    apiService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
    });

});

refs.loadMoreBtn.addEventListener('click', () => {
    apiService.fetchImages().then(hits => {
        updateGalleryMarkup(hits);
    });


});
