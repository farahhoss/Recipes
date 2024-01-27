/// <reference types="../@types/jquery" />;
import { Main } from "./main.module.js";
// import { Search } from "./search.module.js";
let setting = new Main();
// let search = new Search();
let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;

$(function () {
  $(".loading-screen").fadeOut(500);
  $("body").css("overflow", "visible");
  /********************fire function aos */
  AOS.init({
    delay: 300,
    duration: 400,
    easing: "ease",
  });
});
