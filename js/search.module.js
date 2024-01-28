/// <reference types="../@types/jquery" />;
import { Category } from "./category.module.js";

export class Search {
  constructor() {
    let category = new Category();

    console.log("serchh");
    // $("#search").on("click", this.showSearchInputs.bind(this));

    // Attach click event to the parent element with id "search"
    $("#search").on("click", this.showSearchInputs.bind(this));

    // Attach keyup event to the parent element that contains the input fields
    $(document).on("keyup", "#searchContainer", (event) => {
      if (event.target.id === "input1") {
        this.searchByName(event.target.value);
      } else if (event.target.id === "input2") {
        this.searchByFLetter(event.target.value);
      }
    });

    $(document).on("click", "#rowData", (event) => {
      const detailsTarget = event.target.closest(".meal");
      if (detailsTarget && detailsTarget.id === "detailsTarget") {
        const mealId = detailsTarget.getAttribute("data-target");
        console.log("Meal ID:", mealId);
        // Call a function or perform actions with the mealId as needed
        this.getMealDetails(mealId);
      }
    });
  }

  async getMealDetails(mealID) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    searchContainer.innerHTML = "";
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    );
    let responeData = await respone.json();
    console.log(responeData.meals[0]);
    this.displayMealDetails(responeData.meals[0]);
    $(".inner-loading-screen").fadeOut(300);
  }
  displayMealDetails(meal) {
    searchContainer.innerHTML = "";

    let ingredients = ``;

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li>`;
      }
    }

    let tags = meal.strTags?.split(",");
    // let tags = meal.strTags.split(",")
    if (!tags) tags = [];

    let tagsStr = "";
    for (let i = 0; i < tags.length; i++) {
      tagsStr += `
          <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
    }
    rowData.innerHTML = "";
    let cartoona = `
      <div class="col-md-4">
                  <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                      alt="">
                      <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-md-8">
                  <h2>Instructions</h2>
                  <p>${meal.strInstructions}</p>
                  <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                  <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsStr}
                  </ul>
  
                  <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                  <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;

    rowData.innerHTML = cartoona;
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
  showSearchInputs() {
    console.log("serchh");
    searchContainer.innerHTML = `
      <div class="row py-4 ">
          <div class="col-md-6 my-3 ">
              <input id='input1' class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
          </div>
          <div class="col-md-6 my-3">
              <input id='input2'  maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
          </div>
      </div>`;

    rowData.innerHTML = "";
    this.closeNavMenu();
  }

  async searchByFLetter(term) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    term == "" ? (term = "a") : "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
    );
    response = await response.json();

    response.meals ? this.displayMeals(response.meals) : this.displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
  }
  async searchByName(term) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    response = await response.json();
    console.log(response);
    this.displayMeals(response.meals);
    response.meals ? this.displayMeals(response.meals) : this.displayMeals([]);
    $(".inner-loading-screen").fadeOut(300);
  }
}
