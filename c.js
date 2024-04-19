// const vids = require("./vidz.json");
// console.clear()
// // console.log(vids.recipies)

let allRecipes = [];
fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
        allRecipes = data.recipes;
        displayRecipes(allRecipes);
    });

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipesContainer.appendChild(card);
    });
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
  // console.log(vidz)
    const image = document.createElement('img');
    image.src = recipe.image;
    card.appendChild(image);

    const name = document.createElement('h2');
    name.textContent = recipe.name;
    card.appendChild(name);

    const difficulty = document.createElement('p');
    difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
    card.appendChild(difficulty);

    const ratingStars = document.createElement('p');
    ratingStars.textContent = `Rating: ${getStars(recipe.rating)}`;
    card.appendChild(ratingStars);

    const readMoreBtn = document.createElement('button');
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.addEventListener('click', () => {
        showMoreDetails(recipe);
    });
    card.appendChild(readMoreBtn);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('saveBtn');
    saveBtn.addEventListener('click', () => {
        saveRecipe(recipe.id);
    });
    card.appendChild(saveBtn);

    return card;
}


function showMoreDetails(recipe) {
    alert(`Details for ${recipe.name}:
        Ingredients: ${recipe.ingredients}
        Instructions: ${recipe.instructions}
        Serving: ${recipe.servings}
        Calories per Serving: ${recipe.caloriesPerServing}`);
}

function getStars(rating) {
    const roundedRating = Math.round(rating);
    const stars = '⭐'.repeat(roundedRating);
    return stars;
}

function saveRecipe(recipeId) {
    const recipe = allRecipes.find(recipe => recipe.id === recipeId);
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];

    if (!savedRecipes.some(savedRecipe => savedRecipe.id === recipe.id)) {
        savedRecipes.push(recipe);
        localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
        displaySavedRecipes(savedRecipes);
    }
}


function displaySavedRecipes(savedRecipes) {
    const savedRecipesContainer = document.getElementById('saved-recipes');
    savedRecipesContainer.innerHTML = '';

    savedRecipes.forEach(savedRecipe => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('saved-recipe-item');

        const name = document.createElement('p');
        name.textContent = savedRecipe.name;
        name.addEventListener('click', () => {
            showRecipeDetails(savedRecipe);
        });
        recipeItem.appendChild(name);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            deleteSavedRecipe(savedRecipe.id);
        });
        recipeItem.appendChild(deleteBtn);

        savedRecipesContainer.appendChild(recipeItem);
    });
}

function deleteSavedRecipe(recipeId) {
    let savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    displaySavedRecipes(savedRecipes);
}


function loadSavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    displaySavedRecipes(savedRecipes);
}

function showRecipeDetails(recipe) {
    alert(`Details for ${recipe.name}:
        Ingredients: ${recipe.ingredients}
        Instructions: ${recipe.instructions}
        Serving: ${recipe.servings}
        Calories per Serving: ${recipe.caloriesPerServing}`);
}


function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('sidebar-open');
    mainContent.classList.toggle('sidebar-open');
}



loadSavedRecipes();
