const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const sendMsg = async (msg) => {
  console.log(msg);
  if (typeof msg === "object") {
    const path = msg.issues[0].path[0];
    const message = msg.issues[0].message;
    msg = `${path}: ${message}`;
  }

  document.querySelector(".msg").textContent = msg;
  document.querySelector(".msg").classList.add("anime-msg");
  await wait(3000);
  document.querySelector(".msg").classList.remove("anime-msg");
};

const handleResponse = (res) => {
  res
    .json()
    .then((res) => {
      sendMsg(res.msg || res.zod);
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
    credentials: "include",
  })
    .then(async (res) => {
      handleResponse(res);
      if (res.ok) {
        await wait(1000);
        location.href = "../index.html";
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
