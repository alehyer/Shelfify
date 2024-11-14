// Redirect Home button
document.querySelectorAll(".redirect-home").forEach(function (element) {
  element.addEventListener("click", function () {
    window.location.href = "/pages/home.html";
  });
});

// Form submission handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset previous errors
  resetErrors();

  // Get form fields
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const subject = document.getElementById("subject");
  const message = document.getElementById("message");

  let isValid = true;

  // Validate name
  if (!name.value.trim()) {
    showError("name");
    isValid = false;
  }

  // Validate email
  if (!validateEmail(email.value.trim())) {
    showError("email");
    isValid = false;
  }

  // Validate subject
  if (!subject.value.trim()) {
    showError("subject");
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showError("message");
    isValid = false;
  }

  // If form is valid, show success message
  if (isValid) {
    // Here you would typically send the form data to your server
    document.getElementById("successMessage").style.display = "block";
    this.reset();
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showError(fieldName) {
  const field = document.getElementById(fieldName);
  const error = document.getElementById(`${fieldName}Error`);
  field.classList.add("error-border");
  error.style.display = "block";
}

function resetErrors() {
  const errors = document.getElementsByClassName("error");
  const inputs = document.getElementsByClassName("form-input");

  for (let error of errors) {
    error.style.display = "none";
  }

  for (let input of inputs) {
    input.classList.remove("error-border");
  }

  document.getElementById("successMessage").style.display = "none";
}
