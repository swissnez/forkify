//jshint esversion:9

import * as model from './model.js';
import recipeView from './views/RecipeView';

import icons from 'url:../img/icons.svg'; // Index.html <script type=module ....> added!! 
import 'core-js/stable';
import 'regenerator-runtime/runtime'; //Polyfilling 
import searchView from './views/searchView.js';
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

//import { search } from 'core-js/fn/symbol';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const hashId = window.location.hash.slice(1); // obtain hashValue & remove #
    if (!hashId) return;
    console.log(hashId);
    recipeView.renderSpinner(); //Waiting.....
    
    //1) Load recipe via async controller->> to Model (export const loadRecipe = async function (hashId))
   await model.loadRecipe(hashId);
  //const { recipe } = model.state; 

    //2 Rendering recipe HTML 
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
    recipeView.renderError();
  }
  
};
const controlSearchResults = async function () {
  try {
    
    resultsView.renderSpinner();
    
    //Get search query 
    const query = searchView.getQuery();
    if (!query) return;
    // Load Search results
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResultsPage(1));
    // Pagination 
    paginationView.render(model.state.search);
    
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const controlServings = function (newServings) {
  //update the recipe servings in the state 
  model.updateServings(newServings);
  //Re-render the recipe view 
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe); // update only model state NOT render UI (reload static content) 
};

const controlAddBookMark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = () => {
  recipeView.addHandleRender(controlRecipes);
  recipeView.addHandleUpdateServings(controlServings);
  recipeView.addHandleBookmark(controlAddBookMark);
  searchView.addHandlerSearch(controlSearchResults);
  
};
init();



