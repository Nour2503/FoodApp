let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.trim().length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + userInp)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("user-inp").value = ""; // Clear the input field
        console.log(document.getElementById("user-inp").value); // Check if the value is cleared
        
        if (data.drinks === null) {
          result.innerHTML = `<h3 class="msg">No results found</h3>`;
          return;
        }

        let myDrink = data.drinks[0];
        let count = 1;
        let ingredients = [];

        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";

          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }

        let ingredientsList = ingredients.map(item => `<li>${item}</li>`).join("");

        result.innerHTML = `
          <img src="${myDrink.strDrinkThumb}" alt="${myDrink.strDrink}">
          <h2>${myDrink.strDrink}</h2>
          <h3>Ingredients:</h3>
          <ul class="ingredients">${ingredientsList}</ul>
          <h3>Instructions:</h3>
          <p>${myDrink.strInstructions}</p>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getInfo);
