"use strict";

let searchURL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?`;

function cocktailSearch() {
    $('#cocktail-search-form').on('submit', event => {
        event.preventDefault();
        let cocktailName = $('#cocktail-search').val();
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
        <h2 id="drink-title">${responseJson.drinks[i].strDrink}</>
        <img src=${responseJson.drinks[i].strDrinkThumb}>
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
    for (let i = 0; i < resJson.results.length; i++) {
        $('#recipes').append(`
        <h3>Some recipes to make!</h3>
        <ul>
            <li>${resJson.results[i].title}</li>
            <li><img src="${resJson.results[i].image}">
        </ul>
        `)
    }
$('#recipes').removeClass('hidden');
}

$('document').ready(function() {
    cocktailSearch();
})