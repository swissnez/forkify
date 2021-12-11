//jshint esversion:9


// Note methods/functions have changed from #private to _protected, hence _ 

class SearchView {

    _parentEl = document.querySelector('.search');

    getQuery() {
        const query =  this._parentEl.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }
    _clearInput() { this._parentEl.querySelector('.search__field').value = ""; }
    


    addHandlerSearch(handler) {
        this._parentEl.addEventListener("submit", (e) => {
            e.preventDefault();
            handler();
        });
    }

}



export default new SearchView();