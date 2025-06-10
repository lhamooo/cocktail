async function getRandomDrink() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const drink = data.drinks[0];
        
        document.getElementById('drink-image').src = drink.strDrinkThumb;
        document.getElementById('drink-image').alt = drink.strDrink;
        document.getElementById('drink-name').textContent = drink.strDrink;
        document.getElementById("drink-category").textContent = drink.strCategory;

        const alcoholIcon = document.getElementById('alcohol-icon');
        if (drink.strAlcoholic && drink.strAlcoholic.toLowerCase().includes('non')) {
        alcoholIcon.src = 'img/soft.png';
        alcoholIcon.alt = 'non alcohol';
        } else {
            alcoholIcon.src = 'img/cocktail.png';
            alcoholIcon.alt = 'alcohol';
            }           

        displayIngredients(drink);

    } catch (error) {
        console.error('Fehler beim Laden des Cocktails:', error);
    }
}

function flipCard() {
    const card = document.querySelector('.card');
    card.classList.toggle('flipped');
}

getRandomDrink();

function displayIngredients(drink) {
    const ingredientsList = document.getElementById('ingredients-list');
    ingredientsList.innerHTML = '';

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

            ingredientsList.appendChild(ingredientRow);
        }
    }
}

