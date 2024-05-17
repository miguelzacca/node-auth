const deleteUser = () => {
  fetch(`http://127.0.0.1:8000/user/delete/`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(() => {
      location.reload();
    })
    .catch((err) => console.error(err));
};

const updateUser = (field) => {
  console.log(field);
  console.log(JSON.stringify(field));
  fetch(`http://127.0.0.1:8000/user/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(field),
    credentials: "include",
  })
    .then(() => {
      location.reload();
    })
    .catch((err) => console.error(err));
};

const contentLoaded = () => {
  document.querySelector("div button").addEventListener("click", () => {
    const name = prompt("What will your new name be?");
    updateUser({ name });
  });

  document
    .querySelector("div button ~ button")
    .addEventListener("click", () => {
      if (confirm("Are you sure you want to delete your account?")) {
        deleteUser();
      }
    });
};
