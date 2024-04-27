const formContainer = document.querySelector(".form-container");
const loginButton = document.querySelector(".show-area button");
const signupButton = document.querySelector(".show-area button ~ button");
const btnBefore = document.querySelector(".show-area span");
const formH1 = document.querySelector("main .form-header h1");

const signupAnime = () => {
  formContainer.classList.add("anime-signup");
  formContainer.classList.remove("anime-login");

  btnBefore.classList.add("btn-signup");
  btnBefore.classList.remove("btn-login");

  formH1.classList.add("h1-signup");
  formH1.classList.remove("h1-login");

  loginButton.style.color = "#000";
  signupButton.style.color = "#fff";
};

loginButton.addEventListener("click", () => {
  if (formContainer.classList.contains("anime-signup")) {
    formContainer.classList.add("anime-login");
    formContainer.classList.remove("anime-signup");

    btnBefore.classList.add("btn-login");
    btnBefore.classList.remove("btn-signup");

    formH1.classList.add("h1-login");
    formH1.classList.remove("h1-signup");

    signupButton.style.color = "#000";
    loginButton.style.color = "#fff";
  }
});

signupButton.addEventListener("click", () => {
  signupAnime();
});

document
  .querySelector(".more-container button")
  .addEventListener("click", () => {
    signupAnime();
  });
