async function getRandomDrink() {
    try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const drink = data.drinks[0];
        
        document.getElementById('drink-image').src = drink.strDrinkThumb;
        document.getElementById('drink-image').alt = drink.strDrink;
        document.getElementById('drink-name').textContent = drink.strDrink;
        document.getElementById("drink-category").textContent = drink.strCategory;
    } catch (error) {
        console.error('Fehler beim Laden des Cocktails:', error);
    }
}

function flipCard() {
    const card = document.querySelector('.card');
    card.classList.toggle('flipped');
}

getRandomDrink();