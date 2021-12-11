//jshint esversion:9
import icons from 'url:../../img/icons.svg'; // Index.html <script type=module ....> added!! 

export default class View {
    
    _data;
    _errorMessage = "The cook hasn't seen this recipe before or find it, perhaps you can enlighten us!";
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        
        const markup = this._generateMarkup(); // _generateMarkup() is a child class of View (resultsView) 
        this._clear();
        
        
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    update(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;

        const newMarkup = this._generateMarkup(); // inherit _generateMarkup from subclass, both RecipeView & resultsView have own ()

        // Virtual DOM*  
        const newDOM = document.createRange().createContextualFragment(newMarkup); // create a VDOM "virtual" a copy basically
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));
        
        newElements.forEach((newEl, i) => {
            
            const curEl = curElements[i];
            // UPDATE textContents only elements that are different 
            if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim() !=="") {
                curEl.textContent = newEl.textContent;
            }

            // UPDATE attribs 
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => {
                    curEl.setAttribute(attr.name, attrib.value);
                });
            }

            
        });

    }

  
    _clear() {this._parentElement.innerHTML = '';}

     renderSpinner() {
        const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
        this._clear;
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
        
     }
    
    renderError(message = this._errorMessage) {
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);

    }

}