const formContainer = document.querySelector(".form-container");
const loginButton = document.querySelector(".show-area button");
const signupButton = document.querySelector(".show-area button ~ button");
const btnBefore = document.querySelector(".show-area span");

const signup = () => {
  formContainer.classList.add("anime-signup");
  formContainer.classList.remove("anime-login");

  btnBefore.classList.add("btn-signup");
  btnBefore.classList.remove("btn-login");

  loginButton.style.color = "#000";
  signupButton.style.color = "#fff";
};

loginButton.addEventListener("click", () => {
  if (formContainer.classList.contains("anime-signup")) {
    formContainer.classList.add("anime-login");
    formContainer.classList.remove("anime-signup");

    btnBefore.classList.add("btn-login");
    btnBefore.classList.remove("btn-signup");

    signupButton.style.color = "#000";
    loginButton.style.color = "#fff";
  }
});

signupButton.addEventListener("click", () => {
  signup();
});

document
  .querySelector(".more-container button")
  .addEventListener("click", () => {
    signup();
  });
