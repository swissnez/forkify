//jshint esversion:9

import View from "./View.js";

import icons from 'url:../../img/icons.svg'; // Index.html <script type=module ....> added!! 

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {
        console.log(this);
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        

        if (this._data.page === 1 && numPages >1) {
            return `
            <button class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            
            
            `;
        }
        
        if (this._data.page === numPages && numPages > 1) {
            return `
            <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
          </button>`;
        }

        return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page-1}</span>
            </button>`;
    }
}
export default new PaginationView(); // export a new instance object 