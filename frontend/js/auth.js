const connected = () => {
  const cookies = document.cookie?.split(";");

  let token = null;
  let id = null;

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=").map((cookie) => cookie.trim());
    if (name === "auth_token") {
      token = value;
    } else if (name === "auth_id") {
      id = value;
    }
  }

  if (token && id) {
    fetch(`http://127.0.0.1:8000/user/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
  }
};

const setCookie = (name, value, expiration) => {
  const expires = new Date(Date.now() + expiration).toUTCString();
  const path = `path=/; domain=definitivelogin.netlify.app`;
  document.cookie = `${name}=${value}; expires=${expires}; ${path}; secure; HttpOnly`;
};

const sendMsg = (msg) => {
  document.querySelector(".msg").textContent = msg;
  document.querySelector(".msg").classList.add("anime-msg");
  setTimeout(() => {
    document.querySelector(".msg").classList.remove("anime-msg");
  }, 2000);
};

const handleResponse = (res) => {
  res
    .json()
    .then((res) => {
      setCookie("auth_token", res.token, 259200000);
      setCookie("auth_id", res.id, 259200000);
      sendMsg(res.msg);
    })
    .catch((err) => console.error(err));
};

const login = () => {
  const formData = new FormData(document.querySelector("#login-form"));

  const formDataObj = {};
  for (const [key, value] of formData) {
    formDataObj[key] = value;
  }

  const jsonData = JSON.stringify(formDataObj);

  fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => {
      handleResponse(res);
    })
    .catch((err) => console.error(err));
};

const signup = () => {
  const formData = new FormData(document.querySelector("#signup-form"));

  const formDataObj = {};
  for (const [key, value] of formData) {
    formDataObj[key] = value;
  }

  const jsonData = JSON.stringify(formDataObj);

  fetch("http://127.0.0.1:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => handleResponse(res))
    .catch((err) => console.error(err));
};

document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  login();
  document.querySelector("#login-form").reset();
});

document.querySelector("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  signup();
  document.querySelector("#signup-form").reset();
});
