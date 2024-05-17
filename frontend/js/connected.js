fetch(`http://127.0.0.1:8000/user/`, {
  credentials: "include",
})
  .then((res) => {
    res
      .json()
      .then((res) => {
        if (!res.user || !res.html) {
          location.href = "./pages/login.html";
        }
        document.body.innerHTML = res.html;
        document.querySelector("main h1").textContent = res.user.name;
        contentLoaded();
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
