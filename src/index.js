import './styles.css';
import './scss/normalize.scss';
import 'material-design-icons/iconfont/material-icons.css';

import imagesListTemplate from './templates/images-list.hbs'

import apiService from './js/apiService.js';

import { refs } from './js/refs.js';



refs.searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const form = event.currentTarget;
    const inputValue = form.elements.query.value;
    console.log(inputValue);

    refs.galleryList.innerHTML = '';

    apiService(inputValue);
    function apiService(searchQuery) {
        const apiKey = '18773042-c85a376c8239f0d185771db9c';
        const url = ` https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then(({ hits }) => {
                console.log(hits);

                const murkup = imagesListTemplate(hits)

                refs.galleryList.insertAdjacentHTML('beforeend', murkup);

            })
            .catch(error => console.log(error));
    }
})



