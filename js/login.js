const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (username.value === "") {
    alert("⛔Username is required!");
    username.focus();
    return;
  }
  if (username.value.length < 3) {
    alert("⛔Username has at least 3 characters!");
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
  alert("🥳Form submitted successfully!");
  window.location.href = "./index.html";
});
