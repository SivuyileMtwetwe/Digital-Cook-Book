document.addEventListener("DOMContentLoaded", function() {
    // Fetch recipes from the API
    const url = 'https://dummyjson.com/recipes';
    let allRecipes = [];

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

    // Search functionality
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredRecipes = allRecipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchTerm);
        });
        displayRecipes(filteredRecipes);
    });
});
