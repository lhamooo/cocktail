function getIngredients(drink) {
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(
        measure ? `${measure.trim()} ${ingredient.trim()}` : ingredient.trim()
      );
    }
  }
  return ingredients;
}

async function loadCocktail() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const data = await res.json();
  const drink = data.drinks[0];

  const card = document.createElement("div");
  card.className = "card";

  const top = 70 + Math.random() * (window.innerHeight - 300 - 70);
  const left = Math.random() * (window.innerWidth - 300);
  card.style.top = `${top}px`;
  card.style.left = `${left}px`;

  const ingredients = getIngredients(drink);

  card.innerHTML = `
        <div class="card-header">
          <span class="title">Cocktail.exe</span>
          <div class="close-btn" onclick="this.closest('.card').remove()">X</div>
        </div>
        <div class="card-content">
          <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" />
          <h3>${drink.strDrink}</h3>
          <div class="ingredients">
  <strong>Ingredients:</strong>
  <ul>
    ${ingredients.map((i) => `<li>${i}</li>`).join("")}
  </ul>
</div>
<div class="instructions">
  <strong>Preparation:</strong>
  <p>${drink.strInstructions}</p>
</div>
        </div>
      `;

  document.body.appendChild(card);
   makeDraggable(card);
}



function makeDraggable(card) {
  let offsetX, offsetY;
  let isDragging = false;

  card.addEventListener("mousedown", (e) => {
   
    if (e.button !== 0) return;

    isDragging = true;
   
    const rect = card.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;


    card.style.transition = "none";
    card.style.zIndex = 1000;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    let x = e.clientX - offsetX;
    let y = e.clientY - offsetY;

    
    x = Math.max(0, Math.min(window.innerWidth - card.offsetWidth, x));
    y = Math.max(70, Math.min(window.innerHeight - card.offsetHeight, y)); 

    card.style.left = x + "px";
    card.style.top = y + "px";
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      card.style.transition = "transform 0.3s";
      card.style.zIndex = ""; 
    }
  });
}
