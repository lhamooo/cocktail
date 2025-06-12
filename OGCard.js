const flavorFilters = {
  all: [],
  sweet: [
    "Sweet",
    "Sugar",
    "Syrup",
    "Honey",
    "Maple",
    "Agave",
    "Molasses",
    "Caramel",
    "Vanilla",
    "Brown Sugar",
    "Simple Syrup",
    "Fruit Juice",
    "Grenadine",
    "Coconut Cream",
    "Cream",
    "Demerara",
    "Date Syrup",
    "Liqueur",
    "Amaretto",
    "Maraschino",
    "Butterscotch",
    "Chocolate",
    "Milk",
    "Condensed Milk",
  ],
  sour: [
    "Sour",
    "Lemon",
    "Lime",
    "Citrus",
    "Tamarind",
    "Vinegar",
    "Grapefruit",
    "Orange",
    "Pineapple",
    "Cranberry",
    "Sour Mix",
    "Citric Acid",
    "Sake",
    "Yuzu",
    "Calamansi",
    "Passion Fruit",
    "Pomegranate",
    "Tart",
  ],
  bitter: [
    "Bitter",
    "Bitters",
    "Tonic",
    "Campari",
    "Herbal",
    "Quinine",
    "Wormwood",
    "Amaro",
    "Vermouth",
    "Gentian",
    "Chinotto",
    "Fernet",
    "Angostura",
    "Hop",
    "Bitter Orange",
    "Grapefruit Peel",
    "Coffee",
    "Cocoa",
  ],
  fruity: [
    "Fruit",
    "Fruity",
    "Juice",
    "Berry",
    "Apple",
    "Peach",
    "Mango",
    "Pineapple",
    "Strawberry",
    "Cherry",
    "Watermelon",
    "Melon",
    "Passion Fruit",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Apricot",
    "Grape",
    "Cantaloupe",
    "Kiwi",
    "Papaya",
    "Fig",
    "Cranberry",
  ],
};

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("alcohol-toggle");
  const toggleLabel = document.getElementById("toggle-label");
  const cardsContainer = document.getElementById("cards-container");
  document.querySelector('[data-flavor="all"]').classList.add("active");

  // Setzt den Dark oder Light Theme + Titel + Bild
  function applyTheme(withAlcohol) {
    if (withAlcohol) {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      toggleLabel.textContent = "Mit Alkohol";

      document.getElementById("title-line-1").textContent = "less thinking";
      document.getElementById("title-line-2").textContent = "more drinking";
      document.getElementById("first-img").src = "img/drink.jpg"; // Pfad anpassen
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      toggleLabel.textContent = "Ohne Alkohol";

      document.getElementById("title-line-1").textContent = "sober, but";
      document.getElementById("title-line-2").textContent = "never boring";
      document.getElementById("first-img").src = "img/smoothie.jpg"; // Pfad anpassen
    }
  }

  // Eventlistener für Toggle
  toggle.addEventListener("change", function () {
    const withAlcohol = !this.checked; // checked = ohne Alkohol, daher negieren
    applyTheme(withAlcohol);
    loadDrinks(withAlcohol);
  });

  // Default Wert beim Laden
  const defaultWithAlcohol = true;
  toggle.checked = !defaultWithAlcohol;
  applyTheme(defaultWithAlcohol);
  loadDrinks(defaultWithAlcohol);

  let currentFlavor = "all";

  // Flavor-Buttons
  document.querySelectorAll(".flavor-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".flavor-btn").forEach((btn) =>
        btn.classList.remove("active")
      );
      button.classList.add("active");
      currentFlavor = button.dataset.flavor;
      loadDrinks(!toggle.checked); // Toggle checked ist ohne Alkohol
    });
  });

  // Lade Getränke basierend auf Thema und Filter
  async function loadDrinks(withAlcohol) {
    try {
      const endpoint = withAlcohol
        ? "filter.php?a=Alcoholic"
        : "filter.php?a=Non_Alcoholic";
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/${endpoint}`
      );
      const data = await response.json();
      const drinks = data.drinks;

      // Filter nach Geschmack
      const filteredDrinks = drinks.filter((drink) => {
        if (currentFlavor === "all") return true;
        const name = drink.strDrink.toLowerCase();
        const matchKeywords = flavorFilters[currentFlavor];
        return matchKeywords.some((keyword) =>
          name.includes(keyword.toLowerCase())
        );
      });

      cardsContainer.innerHTML = "";

      for (const drink of filteredDrinks) {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        const card = document.createElement("div");
        card.className = "card";

        const cardFront = document.createElement("div");
        cardFront.className = "card-front";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "image-wrapper";

        const circleBg = document.createElement("div");
        circleBg.className = "circle-bg";

        const drinkImage = document.createElement("img");
        drinkImage.src = drink.strDrinkThumb;
        drinkImage.alt = drink.strDrink;
        drinkImage.id = "drink-image";

        const nameDiv = document.createElement("div");
        nameDiv.className = "name";

        const drinkName = document.createElement("h2");
        drinkName.textContent = drink.strDrink;
        drinkName.id = "drink-name";

        const alcoholIcon = document.createElement("img");
        alcoholIcon.id = "alcohol-icon";
        alcoholIcon.alt = withAlcohol ? "alcohol" : "non alcohol";
        alcoholIcon.src = withAlcohol ? "img/cocktail.png" : "img/soft.png";
        alcoholIcon.style.marginTop = "0.75rem";
        alcoholIcon.style.width = "25px";
        alcoholIcon.style.height = "25px";

        nameDiv.appendChild(drinkName);
        nameDiv.appendChild(alcoholIcon);

        imageWrapper.appendChild(circleBg);
        imageWrapper.appendChild(drinkImage);

        cardFront.appendChild(imageWrapper);
        cardFront.appendChild(nameDiv);

        const cardBack = document.createElement("div");
        cardBack.className = "card-back";

        const backContent = document.createElement("div");
        backContent.className = "back-content";

        const ingredientsTitle = document.createElement("h3");
        ingredientsTitle.textContent = "Ingredients";

        const ingredientsList = document.createElement("div");
        ingredientsList.className = "ingredients-container";

        backContent.appendChild(ingredientsTitle);
        backContent.appendChild(ingredientsList);

        const recipeButton = document.createElement("a");
        recipeButton.href = "#";
        recipeButton.className = "btn btn-light";
        recipeButton.setAttribute("data-bs-toggle", "modal");
        recipeButton.setAttribute("data-bs-target", "#recipeModal");
        recipeButton.textContent = "Recipe";
        recipeButton.onclick = async () => {
          const detailResponse = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
          );
          const detailData = await detailResponse.json();
          displayModalContent(detailData.drinks[0]);
        };

        backContent.appendChild(recipeButton);

        cardBack.appendChild(backContent);

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        cardContainer.appendChild(card);
        cardsContainer.appendChild(cardContainer);

        let cachedDetails = null;

        card.onclick = async (event) => {
          if (!event.target.closest(".btn")) {
            card.classList.toggle("flipped");

            if (card.classList.contains("flipped") && !cachedDetails) {
              const detailResponse = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`
              );
              const detailData = await detailResponse.json();
              cachedDetails = detailData.drinks[0];

              ingredientsList.innerHTML = "";
              for (let i = 1; i <= 15; i++) {
                const ingredient = cachedDetails[`strIngredient${i}`];
                const measure = cachedDetails[`strMeasure${i}`];
                if (ingredient && ingredient.trim() !== "") {
                  const ingredientRow = document.createElement("div");
                  ingredientRow.className = "ingredient-row";
                  ingredientRow.innerHTML = `
                    <span class="ingredient-name">${ingredient}</span>
                    ${
                      measure
                        ? `<span class="ingredient-measure">${measure}</span>`
                        : ""
                    }
                  `;
                  ingredientsList.appendChild(ingredientRow);
                }
              }
            }
          }
        };
      }
    } catch (error) {
      console.error("Fehler beim Laden der Getränke:", error);
    }
  }

  // Modal Inhalt füllen
  function displayModalContent(drink) {
    const modalIngredientsList = document.getElementById(
      "modal-ingredients-list"
    );
    modalIngredientsList.innerHTML = "";

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        const ingredientRow = document.createElement("div");
        ingredientRow.className = "ingredient-row";

        ingredientRow.innerHTML = `
          <span class="ingredient-name">${ingredient}</span>
          ${measure ? `<span class="ingredient-measure">${measure}</span>` : ""}
        `;

        modalIngredientsList.appendChild(ingredientRow);
      }
    }

    document.getElementById("recipe-instructions").textContent =
      drink.strInstructions;
  }
});