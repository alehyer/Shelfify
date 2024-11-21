document.addEventListener("DOMContentLoaded", () => {
  // Form submission handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
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
        document.getElementById("successMessage").style.display = "block";
        this.reset();
      }
    });
  } else {
    console.error("Contact form not found!");
  }

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show error for a specific field
  function showError(fieldName) {
    const field = document.getElementById(fieldName);
    const error = document.getElementById(`${fieldName}Error`);
    if (field && error) {
      field.classList.add("error-border"); // This adds the error border
      error.style.display = "block"; // This shows the error message
    }
  }

  // Reset all errors
  function resetErrors() {
    const errors = document.getElementsByClassName("error");
    const inputs = document.getElementsByClassName("form-input");

    for (let error of errors) {
      error.style.display = "none";
    }

    for (let input of inputs) {
      input.classList.remove("error-border");
    }

    const successMessage = document.getElementById("successMessage");
    if (successMessage) {
      successMessage.style.display = "none";
    }
  }
});
