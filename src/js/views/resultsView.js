//jshint esversion:9
import View from "./View.js";
import icons from 'url:../../img/icons.svg'; // Index.html <script type=module ....> added!! 

class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = "The cook hasn't seen this recipe before or find it, perhaps you can enlighten us!";

    _generateMarkup() {
        this._clear(); // clear spinner
        console.log("GenerateMarkup() from ResultsView Class extends View");
        console.log(this._data);
        return this._data.map(this._generateMarkupPreview).join("");
       
    }
   
    
    _generateMarkupPreview(result) {
        return `
        <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
        `;
    }
}

export default new ResultsView(); // export instance 