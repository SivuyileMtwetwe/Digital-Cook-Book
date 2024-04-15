
fetch('https://dummyjson.com/recipes')
  .then(response => response.json())
  .then(data => {
    const recipesContainer = document.getElementById('recipes');
    data.recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.classList.add('recipe-card');

      
      const image = document.createElement('img');
        image.src = recipe.image;
        card.appendChild(image);


        const name = document.createElement('h2');
        name.textContent = recipe.name;
        card.appendChild(name);

        const ingredients = document.createElement('p');
        ingredients.innerHTML = `<h5>Ingredients:</h5> ${recipe.ingredients}`;
        card.appendChild(ingredients);

        const instructions = document.createElement('p');
        instructions.innerHTML = `<h5>Instructions:</h5> ${recipe.instructions}`;
        card.appendChild(instructions)


      recipesContainer.appendChild(card);
    });
  });    
  fetch('https://dummyjson.com/recipes')
    .then(response => response.json())
    .then(data => {
      const recipesContainer = document.getElementById('recipes');
      data.recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
  
        
        const image = document.createElement('img');
          image.src = recipe.image;
          card.appendChild(image);
  
  
          const name = document.createElement('h2');
          name.textContent = recipe.name;
          card.appendChild(name);
  
          const ingredients = document.createElement('p');
          ingredients.innerHTML = `<h5>Ingredients:</h5> ${recipe.ingredients}`;
          card.appendChild(ingredients);
  
          const instructions = document.createElement('p');
          instructions.innerHTML = `<h5>Instructions:</h5> ${recipe.instructions}`;
          card.appendChild(instructions);
  
          if (recipe.prepTimeMinutes) {
          const prepTime = document.createElement('p');
          prepTime.textContent = `Preparation Time: ${recipe.prepTimeMinutes}`;
          card.appendChild(prepTime);
        }
  
        if (recipe.cookTimeMinutes) {
          const cookTime = document.createElement('p');
          cookTime.textContent = `Cooking Time: ${recipe.cookTimeMinutes}`;
          card.appendChild(cookTime);
        }
  
        if (recipe.servings) {
          const servings = document.createElement('p');
          servings.textContent = `Servings: ${recipe.servings}`;
          card.appendChild(servings);
        }
  
        if (recipe.difficulty) {
          const difficulty = document.createElement('p');
          difficulty.textContent = `Difficulty: ${recipe.difficulty}`;
          card.appendChild(difficulty);
        }
  
        if (recipe.cuisine) {
          const cuisine = document.createElement('p');
          cuisine.textContent = `Cuisine: ${recipe.cuisine}`;
          card.appendChild(cuisine);
        }
  
        if (recipe.caloriesPerServing) {
          const caloriesPerServing = document.createElement('p');
          caloriesPerServing.textContent = `Calories Per Serving: ${recipe.caloriesPerServing}`;
          card.appendChild(caloriesPerServing);
        }
  
        if (recipe.mealType) {
          const mealType = document.createElement('p');
          mealType.textContent = `Meal Type: ${recipe.mealType}`;
          card.appendChild(mealType);
        }
  
      //   if (recipe.rating) {
      //     const rating = document.createElement('p');
      //     rating.textContent = `Rating: ${recipe.rating}`;
      //     card.appendChild(rating);
      //   }
  
        if (recipe.rating) {
          const ratingStars = document.createElement('p');
          ratingStars.textContent = `Rating: ${getStars(recipe.rating)}`;
          card.appendChild(ratingStars);
        }
  
        
  function filterRecipes() {

       const cookingTimeSelect = document.getElementById('cookingTime');
       const difficultySelect = document.getElementById('difficulty');
       const mealTypeSelect = document.getElementById('mealType');
   
       cookingTimeSelect.addEventListener('change', applyFilters);
       difficultySelect.addEventListener('change', applyFilters);
       mealTypeSelect.addEventListener('change', applyFilters);
   
       function applyFilters() {
           const selectedCookingTime = cookingTimeSelect.value;
           const selectedDifficulty = difficultySelect.value;
           const selectedMealType = mealTypeSelect.value;
   
           const filteredRecipes = json.recipes.filter(recipe => {
               return (
                   (selectedCookingTime === 'short' && recipe.cookingTime <= 30) ||
                   (selectedCookingTime === 'medium' && recipe.cookingTime > 30 && recipe.cookingTime <= 60) ||
                   (selectedCookingTime === 'long' && recipe.cookingTime > 60)
               ) && recipe.difficulty === selectedDifficulty && recipe.mealType === selectedMealType;
           });
   
           
           const container = document.getElementById('json-container');
           container.innerHTML = '';

           filteredRecipes.slice(0, 50).forEach(recipe => {
               const card = createCard(recipe);
               container.appendChild(card);
           });
       }
   
  
       const filteredRecipes = json.recipes.filter(recipe => {
          const cookingTimeInMinutes = parseInt(recipe.cookingTime.replace(/\D/g, ""));
      
          return (
            (selectedCookingTime === 'short' && cookingTimeInMinutes <= 30) ||
            (selectedCookingTime === 'medium' && cookingTimeInMinutes > 30 && cookingTimeInMinutes <= 60) ||
            (selectedCookingTime === 'long' && cookingTimeInMinutes > 60)
          ) && recipe.difficulty === selectedDifficulty && recipe.mealType === selectedMealType;
        });
  
      }
        recipesContainer.appendChild(card);
        
      });
  
  
      
    });
  
    function getStars(rating) {
    const roundedRating = Math.round(rating);
    const stars = '⭐'.repeat(roundedRating);
    return stars}