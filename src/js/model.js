//jshint esversion:9
//import { search } from 'core-js/library/es6/symbol';
import { async } from 'regenerator-runtime';
import { API_URL,RES_PER_PAGE } from "./config.js";
import { getJSON } from "./helpers.js";





export const state = {
    recipe: {
        // ingredients:[],
    },
    search: {
        query: '',
        results: [],
        resultsPerPage: RES_PER_PAGE,
    },
    bookmarks: [],
};

export const loadRecipe = async function (hashId) {
    try { 
        const data = await getJSON(`${API_URL}${hashId}`); // Import getJSON from helper.js file 
        // --- DESCTRUCTRING ---
        let { recipe } = data.data; //Destruct recipe var returned data from await (JSONed)
        // Mutate the recipe variable as an obj but shortname all keys i.e image: recipe.image_url (ugly)
        state.recipe = {

            ingredients: recipe.ingredients,
            id: recipe.id,
            image: recipe.image_url,
            title: recipe.title,
            publisher: recipe.publisher,
            cookingTime: recipe.cooking_time,
            servings: recipe.servings,
            sourceUrl: recipe.source_url
      
        };
        console.log(state.recipe);
        // window.recipe = recipe;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        const data = await getJSON(`${API_URL}?search=${query}`); //USE helpers.js  note we use ?search= parameter 
        state.search.query = query;
        state.search.results = data.data.recipes.map(recipe => { // return a {} to state.search (data.data.recipes is an array hence we use map)
            return {
                id: recipe.id,
                image: recipe.image_url,
                title: recipe.title,
                publisher: recipe.publisher,
                
            };
        });
        state.search.page = 1;
    } catch (err) {
        console.error(err);
        throw err;
    }  
};

const persistBookmarks = function () {
    localStorage.setItem("bookmarks", JSON.stringify(state));
};

export const getSearchResultsPage = function (page=1) {
    const start = (page - 1) * state.search.resultsPerPage; // 1 -1 = 0 index of array start!  
    const end = page * state.search.resultsPerPage; // 1*10 = 10

    return state.search.results.slice(start, end);
};
export const updateServings = (newServings)=> {
    
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = (ing.quantity * newServings / state.recipe.servings);
    });
    state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
    state.bookmarks.push(recipe);  

    //mark current recipe as current bookmark 

    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};