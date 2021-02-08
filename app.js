
// search button and meal item start..

const searchBtn = document.getElementById("search-food-button");
searchBtn.addEventListener('click', getFoodData = food => {
    let getSearchInputResult = document.getElementById('search-food-input').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${getSearchInputResult}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
         const mealContainer = document.getElementById('meal-container');
             mealContainer.innerHTML = '';
        if(data.meals){
            data.meals.forEach(meal => {
                    const mealDiv = document.createElement('div');
                    const ingredients = meal.strInstructions.replace(/(\r\n|\r|\n)/g, '<br>');
                    console.log(ingredients);
                    mealDiv.className = 'single-result col-md-3 foodImg align-items-center my-3 p-3';
                    mealDiv.innerHTML = `
                    <div onclick="getIngredient('${meal.strMeal}','${meal.idMeal}', '${meal.strMealThumb}', '${ingredients}')">
                        
                    <div>
                        <div class="">
                        <div class="d-flex justify-content-center">
                             <img src=${meal.strMealThumb} class="card-img-top" alt="...">
                        </div>
                        <div class="card-body text-center">
                             <b class="card-text">${meal.strMeal}</b>
                        </div>
                        </div>
                
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                        </div>
                    </div>`;
                    mealContainer.appendChild(mealDiv);
                });
        } 
        else{
            data.meals = "sorry. we don't have this type of food";
        }
    })
});

// search button and meal item end..



// ingredient item start..

const getIngredient = async (strMeal, idMeal, strMealThumb, ingredients) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayIngredient(idMeal, strMeal, strMealThumb, ingredients);
    }
    catch (error) {
        displayError('Sorry! I failed to load Ingredient, Please try again later!!!')
    }
}


const displayIngredient = (Ingredient, strMeal, strMealThumb, ingredients) => {
    const ingredientDiv = document.getElementById('meal-container');
    ingredientDiv.innerHTML = `<div  class=" mx-auto py-4">
    <div class="ingredients">
    <img src="${strMealThumb}" alt=""> <br>
        <h4 align=left>${strMeal}</h4>       
        <p align=left>${ingredients}</p>       
    </div>
`;
}


const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

// ingredient item start..