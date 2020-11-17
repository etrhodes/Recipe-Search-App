"use strict";

let searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?`;

function cocktailSearch() {
    $('#liquor-search-form').on('submit', event => {
        event.preventDefault();
        let cocktailName = $('#liquor-search').val();
        console.log(cocktailName);
        cocktailResults(cocktailName);
        getRecipes(cocktailName);
    });
}

function cocktailResults(cocktailName) {
    let cocktailURL = searchURL + `s=${cocktailName}`;
    console.log(cocktailURL);
    fetch(cocktailURL)
        .then(response => {
            if(response.ok) {
                return response.json();
            }
        })
        .then (responseJson => 
            displayCocktail(responseJson)
        )
}

function displayCocktail(responseJson) {
    console.log(responseJson);
    $('#target').empty();
    for (let i = 0; i < responseJson.drinks.length; i++) {
    $('#target').append(`
        <div class="item">
            <img src=${responseJson.drinks[i].strDrinkThumb}>
            <h4 id="drink-title">${responseJson.drinks[i].strDrink}</h4>
            <form action="https://www.google.com/search" class="searchform" method="get" name="searchform" target="_blank">
                <input autocomplete="on" class="form-control search" name="q" value="${responseJson.drinks[i].strDrink}" type="text">
                <button class="button" type="submit">Make it!</button>
            </form>
        </div>
    `);
    }
$('#results').removeClass('hidden');   
};

function getRecipes(cocktailName) {
    let spoonURL = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=9a92669a463f42fba042697f8168faae&addRecipeInformaton=true';
    let drinkParams = `&query=${cocktailName}`;
    let drinkURL = spoonURL + drinkParams;
    console.log(drinkURL);
    fetch(drinkURL)
.then(response => {
	if(response.ok) {
        return response.json();
    }
})
.then(resJson => 
    displayRecipe(resJson)
)
.catch(err => {
	console.error(err);
});
}

function displayRecipe(resJson) {
    console.log(resJson);
    $('#recipes').empty();
    for (let i = 0; i < resJson.results.length; i++) {
        $('#recipes').append(`
        <div class="item">
            <img src="${resJson.results[i].image}">
            <p>${resJson.results[i].title}</p>
        </div>
        `)
    }
$('#recipes-results').removeClass('hidden');
}

$('document').ready(function() {
    cocktailSearch();
})