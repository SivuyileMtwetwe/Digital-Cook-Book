document.addEventListener("DOMContentLoaded", function() {
    // Fetch recipes from the API
    const url = 'https://dummyjson.com/recipes';
    let allRecipes = [];
    let favorites = []; // Array to store favorite recipes
    let currentView = 'all'; // Track the current view ('all' or 'favorites')

    fetch(url)
        .then(response => response.json())
        .then(data => {
            allRecipes = data.recipes;
            displayRecipes(allRecipes);
        });

    // Display recipes on the page
    function displayRecipes(recipes) {
        const recipesContainer = document.getElementById('recipes');
        recipesContainer.innerHTML = '';

        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            recipesContainer.appendChild(card);
        });
    }

    // Create a recipe card element
    function createRecipeCard(recipe) {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

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

        // Favorite button
        const favoriteBtn = document.createElement('button');
        favoriteBtn.textContent = 'Favorite';
        favoriteBtn.addEventListener('click', () => {
            addToFavorites(recipe);
        });
        card.appendChild(favoriteBtn);

        return card;
    }

    // Show more details modal
    function showMoreDetails(recipe) {
        const modal = document.getElementById('myModal');
        const modalContent = document.getElementById('modal-content');
        modal.style.display = "block";
        modalContent.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Serving:</strong> ${recipe.servings}</p>
            <p><strong>Calories per Serving:</strong> ${recipe.caloriesPerServing}</p>
        `;
    }

    // Close modal
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const modal = document.getElementById('myModal');

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to get star ratings
    function getStars(rating) {
        const roundedRating = Math.round(rating);
        const stars = '⭐'.repeat(roundedRating);
        return stars;
    }

    // Function to add recipe to favorites
    function addToFavorites(recipe) {
        // Check if the recipe already exists in favorites
        const isAlreadyFavorite = favorites.some(favRecipe => favRecipe.name === recipe.name);
        if (!isAlreadyFavorite) {
            favorites.push(recipe);
            updateFavoritesNav();
        }
    }

    // Update favorites in navigation bar
    function updateFavoritesNav() {
        const favoritesNav = document.getElementById('favorites');
        favoritesNav.textContent = `Favorites (${favorites.length})`;
    }

    // Render favorites when "Favorites" link is clicked
    const favoritesNav = document.getElementById('favorites');
    favoritesNav.addEventListener('click', () => {
        renderFavorites();
    });

    // Render all recipes when "Recipes" link is clicked
    const recipesNav = document.getElementById('recipesNav');
    recipesNav.addEventListener('click', () => {
        renderAllRecipes();
    });

    // Function to render saved favorites
   // Function to render saved favorites
function renderFavorites() {
    currentView = 'favorites';
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    favorites.forEach(recipe => {
        const card = createRecipeCard(recipe, true); // Pass true to indicate this is in favorites view
        recipesContainer.appendChild(card);
    });
}

// Create a recipe card element
function createRecipeCard(recipe, isInFavorites) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

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

    // Favorite button
    const favoriteBtn = document.createElement('button');
    favoriteBtn.textContent = 'Favorite';
    favoriteBtn.addEventListener('click', () => {
        if (!isInFavorites) {
            addToFavorites(recipe);
        }
    });
    card.appendChild(favoriteBtn);

    // Delete button (only when in favorites view)
    if (isInFavorites) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            removeFromFavorites(recipe);
        });
        card.appendChild(deleteBtn);
    }

    return card;
}

// Function to remove recipe from favorites
function removeFromFavorites(recipe) {
    favorites = favorites.filter(favRecipe => favRecipe.name !== recipe.name);
    updateFavoritesNav();
    if (currentView === 'favorites') {
        renderFavorites();
    }
}})
