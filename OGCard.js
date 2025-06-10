const flavorFilters = {
  all: [],  // leer = alle anzeigen
  sweet: ['Sweet', 'Sugar', 'Syrup'],   // Beispiel Begriffe, die Süße anzeigen könnten
  sour: ['Sour', 'Lemon', 'Lime', 'Citrus'],
  bitter: ['Bitter', 'Bitters', 'Tonic'],
  fruity: ['Fruit', 'Fruity', 'Juice', 'Berry']
};

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('alcohol-toggle');
  const toggleLabel = document.getElementById('toggle-label');
  const cardsContainer = document.getElementById('cards-container');

  toggle.addEventListener('change', function() {
    if (this.checked) {
      toggleLabel.textContent = 'Ohne Alkohol';
      loadDrinks(false);
    } else {
      toggleLabel.textContent = 'Mit Alkohol';
      loadDrinks(true);
    }
  });

  loadDrinks(true);

  async function loadDrinks(withAlcohol) {
    try {
      const endpoint = withAlcohol ? 'filter.php?a=Alcoholic' : 'filter.php?a=Non_Alcoholic';
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`);
      const data = await response.json();
      const drinks = data.drinks.slice(0, 9); // Nur die ersten 9 Getränke

      cardsContainer.innerHTML = '';

    for (const drink of drinks) {
  // Hole alle Details des einzelnen Drinks
  const detailResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`);
  const detailData = await detailResponse.json();
  const detailedDrink = detailData.drinks[0];

  // Jetzt kannst du mit detailedDrink arbeiten, nicht mehr drink
  const cardContainer = document.createElement('div');
  cardContainer.className = 'card-container';

  const card = document.createElement('div');
  card.className = 'card';

  const cardFront = document.createElement('div');
  cardFront.className = 'card-front';

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'image-wrapper';

  const circleBg = document.createElement('div');
  circleBg.className = 'circle-bg';

  const drinkImage = document.createElement('img');
  drinkImage.src = detailedDrink.strDrinkThumb;
  drinkImage.alt = detailedDrink.strDrink;
  drinkImage.id = 'drink-image';

  const nameDiv = document.createElement('div');
  nameDiv.className = 'name';

  const drinkName = document.createElement('h2');
  drinkName.textContent = detailedDrink.strDrink;
  drinkName.id = 'drink-name';

  const drinkCategory = document.createElement('p');
  drinkCategory.textContent = detailedDrink.strCategory || '';
  drinkCategory.id = 'drink-category';

  const alcoholIcon = document.createElement('img');
  alcoholIcon.id = 'alcohol-icon';
  alcoholIcon.alt = withAlcohol ? 'alcohol' : 'non alcohol';
  alcoholIcon.src = withAlcohol ? 'img/cocktail.png' : 'img/soft.png';
  alcoholIcon.style.marginTop = '0.75rem';
  alcoholIcon.style.width = '25px';
  alcoholIcon.style.height = '25px';

  nameDiv.appendChild(drinkName);
  nameDiv.appendChild(drinkCategory);
  nameDiv.appendChild(alcoholIcon);

  imageWrapper.appendChild(circleBg);
  imageWrapper.appendChild(drinkImage);

  cardFront.appendChild(imageWrapper);
  cardFront.appendChild(nameDiv);

  const cardBack = document.createElement('div');
  cardBack.className = 'card-back';

  const backContent = document.createElement('div');
  backContent.className = 'back-content';

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients';

  const ingredientsList = document.createElement('div');
  ingredientsList.className = 'ingredients-container';

  for (let i = 1; i <= 15; i++) {
    const ingredient = detailedDrink[`strIngredient${i}`];
    const measure = detailedDrink[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      const ingredientRow = document.createElement('div');
      ingredientRow.className = 'ingredient-row';
      ingredientRow.innerHTML = `
        <span class="ingredient-name">${ingredient}</span>
        ${measure ? `<span class="ingredient-measure">${measure}</span>` : ''}
      `;
      ingredientsList.appendChild(ingredientRow);
    }
  }

  const recipeButton = document.createElement('a');
  recipeButton.href = '#';
  recipeButton.className = 'btn btn-light';
  recipeButton.setAttribute('data-bs-toggle', 'modal');
  recipeButton.setAttribute('data-bs-target', '#recipeModal');
  recipeButton.textContent = 'Recipe';
  recipeButton.onclick = () => displayModalContent(detailedDrink);

  backContent.appendChild(ingredientsTitle);
  backContent.appendChild(ingredientsList);
  backContent.appendChild(recipeButton);

  cardBack.appendChild(backContent);

  card.appendChild(cardFront);
  card.appendChild(cardBack);

  cardContainer.appendChild(card);
  cardsContainer.appendChild(cardContainer);

  card.onclick = (event) => {
    if (!event.target.closest('.btn')) {
      flipCard(card);
    }
  };
}

    } catch (error) {
      console.error('Fehler beim Laden der Getränke:', error);
    }
  }

  function flipCard(card) {
    card.classList.toggle('flipped');
  }

  function displayModalContent(drink) {
    const modalIngredientsList = document.getElementById('modal-ingredients-list');
    modalIngredientsList.innerHTML = '';

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        const ingredientRow = document.createElement('div');
        ingredientRow.className = 'ingredient-row';

        ingredientRow.innerHTML = `
          <span class="ingredient-name">${ingredient}</span>
          ${measure ? `<span class="ingredient-measure">${measure}</span>` : ''}
        `;

        modalIngredientsList.appendChild(ingredientRow);
      }
    }

    document.getElementById('recipe-instructions').textContent = drink.strInstructions;
  }
});
