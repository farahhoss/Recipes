import { Ingredients } from "./ingrediant.module.js";
export class Area {
  constructor() {
    let ingredients = new Ingredients();
    this.getArea = this.getArea.bind(this);
    $("#area").on("click", this.getArea);
    this.getAreaMeals = this.getAreaMeals.bind(this);
    // Use event delegation to handle the click event on the #categoryMeals elements

    $(document).on("click", "#rowData", (event) => {
      const areaMeals = event.target.closest(".mealss");
      if (areaMeals && areaMeals.id === "areaMeals") {
        const area = areaMeals.getAttribute("data-target");
        console.log("area:", area);
        this.getAreaMeals(area);
      }
    });
  }

  async getArea() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    searchContainer.innerHTML = "";
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    response = await response.json();
    console.log(response.meals);
    this.displayArea(response.meals);
    this.closeNavMenu();
    $(".inner-loading-screen").fadeOut(300);
  }
  displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
      cartoona += `<div class="col-md-3">
      <div  id="areaMeals" 
      data-target="${arr[i].strArea}"  class="rounded-2 text-center cursor-pointer mealss">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
              <h3>${arr[i].strArea}</h3>
      </div>
</div>
`;
    }
    rowData.innerHTML = cartoona;
  }
  async getAreaMeals(area) {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);

    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    response = await response.json();

    this.displayMeals(response.meals);
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
