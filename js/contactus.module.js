/// <reference types="../@types/jquery" />;
export class Contact {
  constructor() {
    console.log("contact");

    $("#contactUs").on("click", this.showContacts);

    $(document).on("submit", "#contactForm", (event) => {
      // Prevent the default form submission
      event.preventDefault();

      // Call the method to show contacts
      this.showContacts();
      this.handleFormSubmission();
    });
    $(document).on("input", "#nameInput", (event) => {
      this.validateName();
      this.checkFormValidity();
    });
    $(document).on("input", "#emailInput", (event) => {
      this.validateEmail();
      this.checkFormValidity();
    });
    $(document).on("input", "#phoneInput", (event) => {
      this.validatePhone();
      this.checkFormValidity();
    });
    $(document).on("input", "#ageInput", (event) => {
      this.validateAge();
      this.checkFormValidity();
    });
    $(document).on("input", "#passwordInput", (event) => {
      this.validatePassword();
      this.checkFormValidity();
    });
    $(document).on("input", "#repasswordInput", (event) => {
      this.validateRePassword();
      this.checkFormValidity();
    });
  }
  validateName() {
    let nameInput = $("#nameInput");
    let nameAlert = $("#nameAlert");
    let nameInputValue = nameInput.val();

    var regex = /^[A-Z][a-z]{3,8}$/;

    if (regex.test(nameInputValue)) {
      // Valid input
      nameAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      nameAlert.removeClass("d-none");
      return false;
    }
  }

  validateEmail() {
    let emailInput = $("#emailInput");
    let emailAlert = $("#emailAlert");
    let emailInputValue = emailInput.val();

    var regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(emailInputValue)) {
      // Valid input
      emailAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      emailAlert.removeClass("d-none");
      return false;
    }
  }

  validatePhone() {
    let phoneInput = $("#phoneInput");
    let phoneAlert = $("#phoneAlert");
    let phoneInputValue = phoneInput.val();

    // regex for phone number validation
    var regex = /^[0-9]{10}$/;

    if (regex.test(phoneInputValue)) {
      // Valid input
      phoneAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      phoneAlert.removeClass("d-none");
      return false;
    }
  }

  validateAge() {
    let ageInput = $("#ageInput");
    let ageAlert = $("#ageAlert");
    let ageInputValue = ageInput.val();

    var regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;

    if (regex.test(ageInputValue)) {
      // Valid input
      ageAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      ageAlert.removeClass("d-none");
      return false;
    }
  }

  validatePassword() {
    let passwordInput = $("#passwordInput");
    let passwordAlert = $("#passwordAlert");
    let passwordInputValue = passwordInput.val();

    //  regex for password validation
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

    if (regex.test(passwordInputValue)) {
      // Valid input
      passwordAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      passwordAlert.removeClass("d-none");
      return false;
    }
  }

  validateRePassword() {
    let rePasswordInput = $("#repasswordInput");
    let rePasswordAlert = $("#repasswordAlert");
    let rePasswordInputValue = rePasswordInput.val();

    //  regex for password validation
    var regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

    if (regex.test(rePasswordInputValue)) {
      // Valid input
      rePasswordAlert.addClass("d-none");
      return true;
    } else {
      // Invalid input
      rePasswordAlert.removeClass("d-none");
      return false;
    }
  }

  checkFormValidity() {
    let submitBtn = $("#submitBtn");
    console.log(submitBtn);
    let isNameValid = this.validateName();
    let isEmailValid = this.validateEmail();
    let isPhoneValid = this.validatePhone();
    let isPasswordValid = this.validatePassword();
    let isRePasswordValid = this.validateRePassword();
    let isAgeValid = this.validateAge();

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isPasswordValid &&
      isRePasswordValid &&
      isAgeValid
    ) {
      submitBtn.prop("disabled", false);
    } else {
      submitBtn.prop("disabled", true);
    }
  }
  showContacts() {
    console.log("hhh");

    rowData.innerHTML = "";

    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
      <form class="container w-75 text-center" id='contactForm'>
          <div class="row g-4 ">
              <div class="col-md-6">
                  <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Special characters and numbers not allowed
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Email not valid *exemple@yyy.zzz
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
                  <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid Phone Number
                  </div>
              </div>
              <div class="col-md-6">
                  <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid age
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="passwordInput" type="password" class="form-control " placeholder="Enter Your Password">
                  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
              </div>
              <div class="col-md-6">
                  <input  id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid repassword 
                  </div>
              </div>
          </div>
          <button id="submitBtn" type="submit" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
      </form>
  </div> `;
  }
  handleFormSubmission() {
    // logic for handling the form submission here

    console.log("Form submitted!");
    rowData.innerHTML = `<div class="col-md-12 text-center d-flex justify-content-center align-items-center pt-5 ">
    <h1 class="text-danger pt-5 ">your Form submitted! </h1>
  </div>`;
  }
}
