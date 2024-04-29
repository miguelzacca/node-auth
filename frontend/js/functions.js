const deleteUser = (token, id) => {
  fetch(`http://127.0.0.1:8000/user/delete/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      location.reload();
    })
    .catch((err) => console.error(err));
};

const contentLoaded = () => {
  document.querySelector("div button").addEventListener("click", () => {
    const cookies = document.cookie?.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split("=");
      const cookieName = parts[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    location.reload();
  });

  document
    .querySelector("div button ~ button")
    .addEventListener("click", () => {
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

      deleteUser(token, id);
    });
};
