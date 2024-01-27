/// <reference types="../@types/jquery" />;
import { Search } from "./search.module.js";
export class Main {
  constructor() {
    let search = new Search();
    // $(document).ready(() => {
    //   searchByName("").then(() => {
    //     $(".loading-screen").fadeIn(500);
    //     $("body").css("overflow", "visible");
    //   });
    // });
    $(function () {
      $(".loading-screen").fadeOut(500);
      $("body").css("overflow", "visible");
    });

    let navHederWidth = $(".nav-header").width();

    console.log(navHederWidth);
    let sideNavMenuWidth = $(".side-nav-menu").width();

    console.log(sideNavMenuWidth);
    $(".side-nav-menu").animate(
      {
        left: -(sideNavMenuWidth - (navHederWidth + 10)),
      },
      500
    );

    console.log("SOOOO");
    $(".open-close-icon").on("click", this.openCloseSideNav);
    this.searchByName("");
  }
  openCloseSideNav() {
    let navHederWidth = $(".nav-header").width();
    let sideNavMenuWidth = $(".side-nav-menu").width();
    let left = $(".side-nav-menu").css("left");
    if (left == "0px") {
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
    } else {
      $(".side-nav-menu").animate(
        {
          left: 0,
        },
        500
      );
      $(".open-close-icon").removeClass("fa-align-justify");
      $(".open-close-icon").addClass("fa-x");
      for (let i = 0; i < 5; i++) {
        $(".links li")
          .eq(i)
          .animate(
            {
              top: 0,
            },
            (i + 5) * 100
          );
      }
    }
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
