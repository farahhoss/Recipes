/// <reference types="../@types/jquery" />;
import { Area } from "./area.module.js";
export class Category {
  constructor() {
    let area = new Area();
    console.log("category");
    // Bind the getCategories method to the current instance of the Category class
    this.getCategories = this.getCategories.bind(this);
    $("#categories").on("click", this.getCategories);

    this.getCategoryMeals = this.getCategoryMeals.bind(this);
    // Use event delegation to handle the click event on the #categoryMeals elements
    $(document).on("click", "#rowData", (event) => {
      const categoryMeals = event.target.closest(".meal");
      if (categoryMeals && categoryMeals.id === "categoryMeals") {
        const category = categoryMeals.getAttribute("data-target");
        console.log("Category:", category);
        this.getCategoryMeals(category);
      }
    });
  }

  async getCategories() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    searchContainer.innerHTML = "";
    let respone = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let responeData = await respone.json();
    console.log(responeData.categories);
    this.displayCategories(responeData.categories);
    $(".inner-loading-screen").fadeOut(300);
    this.closeNavMenu();
  }
  displayCategories(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
      cartoona += `<div class="col-md-3">
      <div id="categoryMeals" 
       data-target="${
         arr[i].strCategory
       }"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
          <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
          <div class="meal-layer position-absolute text-center text-black p-2">
              <h3>${arr[i].strCategory}</h3>
              <p>${arr[i].strCategoryDescription
                .split(" ")
                .slice(0, 20)
                .join(" ")}</p>
          </div>
      </div>
</div>
`;
    }
    rowData.innerHTML = cartoona;
  }
  async getCategoryMeals(category) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    response = await response.json();

    this.displayMeals(response.meals.slice(0, 20));
    $(".inner-loading-screen").fadeOut(300);
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
}
