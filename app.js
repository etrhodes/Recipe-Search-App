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
        );          
}

function displayCocktail(responseJson) {
    console.log(responseJson);
    $('#target').empty();
    if(responseJson.drinks === null) {
        $('#results-container').empty();
        $('#results-container').append(`
        <h2>Sorry, we cannot find any drink recipes with that ingredient. Please try again.</h2>
        `)
    } else {
        $('#results').removeClass('hidden');
        for (let i = 0; i < responseJson.drinks.length; i++) {
            $('#target').append(`
                <div class="item">
                    <img src=${responseJson.drinks[i].strDrinkThumb}>
                    <h4 id="drink-title">${responseJson.drinks[i].strDrink}</h4>
                    <div class="drink-recipe">

                    </div>
                </div>
            `);
            for (let j = 1; j <= 15; j++) {
                if (responseJson.drinks[i]['strIngredient' + j] !== null) {
                    $('.drink-recipe').last().append(`
                        ${responseJson.drinks[i]['strIngredient' + j]} - ${responseJson.drinks[i]['strMeasure' + j]} <br>
                    `);
                } else {
                    break;
                }
            }
            $('.drink-recipe').last().append(`
                ${responseJson.drinks[i].strInstructions};
            `)
        }
    }
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
.then(resJson => 
    recipeList(resJson)
);
}

function displayRecipe(resJson) {
    console.log(resJson);
    $('#recipes').empty();
    if(resJson.results.length === 0) {
        
    } else {
        $('#recipes-results').removeClass('hidden');
        for (let i = 0; i < resJson.results.length; i++) {
            $('#recipes').append(`
            <div class="item">
                <img src="${resJson.results[i].image}">
                <p>${resJson.results[i].title}</p>
                <input type="button" onClick="window.open('https://spoonacular.com/${resJson.results[i].title}-${resJson.results[i].id}');" return false; value="Make it">
            </div>
            `)
        }
    }
}

function recipeList(resJson) {
    console.log(resJson)
}

$('document').ready(function() {
    cocktailSearch();
})