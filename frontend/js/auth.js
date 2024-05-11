const setCookie = (name, value, expirationDays) => {
  const expires = new Date(
    Date.now() + expirationDays * 24 * 60 * 60 * 1000
  ).toUTCString();
  const path = `path=/;`;
  document.cookie = `${name}=${value}; expires=${expires}; ${path};`;
};

const sendMsg = (msg) => {
  console.log(msg);
  if (typeof msg === "object") {
    const path = msg.issues[0].path[0];
    const message = msg.issues[0].message;
    msg = `${path}: ${message}`;
  }

  document.querySelector(".msg").textContent = msg;
  document.querySelector(".msg").classList.add("anime-msg");
  setTimeout(() => {
    document.querySelector(".msg").classList.remove("anime-msg");
  }, 3000);
};

const handleResponse = (res) => {
  res
    .json()
    .then((res) => {
      setCookie("auth_token", res.token, 1);
      setCookie("user_id", res.id, 1);
      sendMsg(res.zod);
    })
    .catch((err) => console.error(err));
};

const formDataToJson = (data) => {
  const formDataObj = {};
  for (const [key, value] of data) {
    formDataObj[key] = value;
  }
  return JSON.stringify(formDataObj);
};

const login = () => {
  const formData = new FormData(document.querySelector("#login-form"));
  const jsonData = formDataToJson(formData);

  fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => {
      handleResponse(res);
      if (res.ok) {
        setTimeout(() => {
          location.href = "../index.html";
        }, 1000);
      }
    })
    .catch((err) => console.error(err));
};

const signup = () => {
  const formData = new FormData(document.querySelector("#signup-form"));
  const jsonData = formDataToJson(formData);

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
