/// <reference types="../@types/jquery" />;
import { Contact } from "./contactus.module.js";
export class Ingredients {
  constructor() {
    let contactus = new Contact();
    console.log("Ingredients");
    this.getIngredients = this.getIngredients.bind(this);
    $("#ingredients").on("click", this.getIngredients);
    this.getIngredientsMeals = this.getIngredientsMeals.bind(this);
    $(document).on("click", "#rowData", (event) => {
      const ingredientMeals = event.target.closest(".mealss");
      if (ingredientMeals && ingredientMeals.id === "ingredientMeals") {
        const ingredient = ingredientMeals.getAttribute("data-target");
        console.log("area:", ingredient);
        this.getIngredientsMeals(ingredient);
      }
    });
  }

  async getIngredients() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    searchContainer.innerHTML = "";
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let responeData = await respone.json();
    console.log(responeData.meals.slice(0, 20));
    this.displayIngredients(responeData.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
    this.closeNavMenu();
  }
  displayIngredients(array) {
    let cartoona = "";
    for (let i = 0; i < array.length; i++) {
      cartoona += `<div class="col-md-3">
      <div
        data-target="${array[i].strIngredient}"
        class="rounded-2 text-center cursor-pointer mealss" id='ingredientMeals'
      >
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${array[i].strIngredient}</h3>
        <p>
         ${array[i].strDescription.split(" ").slice(0, 20).join(" ")}
        </p>
      </div>
    </div>
`;
    }
    rowData.innerHTML = cartoona;
  }
  async getIngredientsMeals(ingrediant) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`
    );
    response = await response.json();

    this.displayMeals(response.meals);
    $(".inner-loading-screen").fadeOut(300);
  }
  closeNavMenu() {
    let navHederWidth = $(".nav-header").width();
    let sideNavMenuWidth = $(".side-nav-menu").width();
    let left = $(".side-nav-menu").css("left");
    $(".side-nav-menu").animate(
      {
        left: -(sideNavMenuWidth - (navHederWidth + 10)),
      },
      500
    );
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".links li").animate(
      {
        top: 300,
      },
      500
    );
  }
  displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
      cartoona += `
            <div class="col-md-3">
                    <div data-target="${
                      arr[i].idMeal
                    }" id='detailsTarget'  onclick="${() =>
        this.getMealDetails(
          arr[i].idMeal
        )}" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img class="w-100" src="${
                          arr[i].strMealThumb
                        }" alt="" srcset="">
                        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${arr[i].strMeal}</h3>
                        </div>
                    </div>
            </div>
            `;
    }

    rowData.innerHTML = cartoona;
  }
}
