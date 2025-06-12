document.getElementById("load-drink-btn").addEventListener("click", (e) => {
  e.preventDefault();
  loadNewDrink();
});

function loadNewDrink() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      if (!data.drinks || !data.drinks.length)
        throw new Error("no drink found");
      const drink = data.drinks[0];

      document.getElementById("drink-img").src = drink.strDrinkThumb;
      document.getElementById("drink-img").alt = drink.strDrink;
      document.getElementById("drink-name").textContent = drink.strDrink;
      document.getElementById("drink-glass").textContent = drink.strGlass;
      document.getElementById("drink-category").textContent = drink.strCategory;

      const icon = document.getElementById("alcohol-icon");
      if (drink.strAlcoholic === "Alcoholic") {
        icon.src = "img/cocktail.png";
      } else {
        icon.src = "img/soft.png";
      }
      icon.alt = drink.strAlcoholic;

      const ingredientsList = document.getElementById("ingredients-list");
      const instructions = document.getElementById("drink-instructions");
      ingredientsList.innerHTML = "";

      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];

        if (ingredient) {
          const nameDiv = document.createElement("div");
          nameDiv.className = "ingredient-name";
          nameDiv.textContent = ingredient.trim();

          const measureDiv = document.createElement("div");
          measureDiv.className = "measure-pill";
          measureDiv.textContent = measure ? measure.trim() : "-";

          ingredientsList.appendChild(nameDiv);
          ingredientsList.appendChild(measureDiv);
        }
      }

      instructions.textContent =
        drink.strInstructions || "Keine Beschreibung verfügbar.";
    })
    .catch((err) => {
      document.getElementById("drink-name").textContent =
        "Ups – Theres an error!";
      console.error(err);
    });
}

document.addEventListener("DOMContentLoaded", loadNewDrink);
