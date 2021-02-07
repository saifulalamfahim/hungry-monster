// search button and meal item start..
const searchBtn = document.getElementById("search-food-button");
searchBtn.addEventListener('click', getFoodData = food => {
    let getSearchInputResult = document.getElementById('search-food-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getSearchInputResult}`)
    .then(response => response.json())
    .then(data => {
        const foodItem = document.getElementById("food-item");
        let foodlist = "";
        if(data.meals){
            data.meals.forEach(meal => {
                foodlist += `
                <div class="card" style="width: 18rem;">
                       <img src= "${meal.strMealThumb}" class="card-img-top" alt="...">
                   <div class="card-body">
                       <p class="card-text">${meal.strMeal}</p>
                   </div>
                   <div>
                   <button onclick="getFoodIngredient('${meal.strMeal}')">details</button>
                   </div>
                </div>`;
            });
        } 
        else{
            foodlist = "sorry. we don't have this type of food";
        }
        foodItem.innerHTML = foodlist;
    });
});
// search button and meal item end..

// ingredient  start..
const getFoodIngredient =  ingredient => {
    const url = `https://www.themealdb.com/api/json/v1/1/list.php?i=${ingredient}`
    fetch(url)
    .then(res => res.json())
    .then(data => ingredientDetails(data[0]));
}
const ingredientDetails = foodDetails => {
    const foodIngredientDetails = document.getElementById("food-details");
    foodIngredientDetails.innerHTML = `
    <h1>${foodDetails.idIngredient}</h1>
    <img src="${foodDetails.strMealThumb}"
    `;
}
// ingredient  end..
