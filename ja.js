const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const confirm_password_input = document.getElementById("confirm-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];

  if (firstname_input) {
    errors = getSignUpFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      confirm_password_input.value
    );
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join(". ");
  }
});

function getSignUpFormErrors(firstname, email, password, confirmPassword) {
  let errors = [];

  if (firstname === "" || firstname == null) {
    errors.push("firstname is required");
    firstname_input.closest(".input-group")?.classList.add("incorrect");
  }

  if (email === "" || email == null) {
    errors.push("email is required");
    email_input.parentElement.classList.add("incorrect");
  }

  if (password === "" || password == null) {
    errors.push("password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  if (password.length < 8) {
    errors.push("password must be at least eight characters");
    password_input.parentElement.classList.add("incorrect");
  }

  if (password !== confirmPassword) {
    errors.push("password does not match confirm password");
    password_input.parentElement.classList.add("incorrect");
    confirm_password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];

  if (email === "" || email == null) {
    errors.push("email is required");
    email_input.parentElement.classList.add("incorrect");
  }

  if (password === "" || password == null) {
    errors.push("password is required");
    password_input.parentElement.classList.add("incorrect");
  }

  return errors;
}

// Real-time error clearing
const allInputs = [firstname_input, email_input, password_input, confirm_password_input].filter(
  (input) => input != null
);

allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.parentElement.classList.contains("incorrect")) {
      input.parentElement.classList.remove("incorrect");
      error_message.innerText = "";
    }
  });
});
