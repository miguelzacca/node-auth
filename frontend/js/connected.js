const getUser = (token, id) => {
  fetch(`http://127.0.0.1:8000/user/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res
        .json()
        .then((res) => {
          if (!res.user) {
            location.href = "./pages/login.html";
          }
          document.querySelector("main h1").textContent = res.user.name;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};

const connected = () => {
  const cookies = document.cookie?.split(";");

  let token = null;
  let id = null;

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=").map((cookie) => cookie.trim());
    if (name === "auth_token") {
      token = value;
    } else if (name === "user_id") {
      id = value;
    }
  }

  if (token && id) {
    return getUser(token, id);
  }

  location.href = "./pages/login.html";
};

connected();
