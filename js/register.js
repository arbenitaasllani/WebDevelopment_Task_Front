const form = document.getElementById("form");
const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (email.value === "") {
    alert("Email is required!");
    email.focus();
    return;
  }
  if (username.value === "" || username.value.length < 3) {
    alert("⛔Username is required or must have at least 3 characters!");
    username.focus();
    return;
  }
  if (password.value === "") {
    alert("⛔Password is required!");
    password.focus();
    return;
  }
  if (password.value.length < 6) {
    alert("⛔The password must have 6 or more characters!");
    password.focus();
    return;
  }
  if (
    confirm_password.value === "" ||
    confirm_password.value != password.value
  ) {
    alert("⛔Please confirm the password!");
    confirm_password.focus();
    return;
  }
  alert("🥳Form submitted successfully!");
  window.location.href = "./list.html";
});
