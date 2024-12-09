document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm"); // Select your form element

    // Add event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission for validation
        const inputs = form.querySelectorAll("[data-error]"); // Get all inputs with a data-error attribute
        const successMessage = document.getElementById("successMessage");

        let allValid = true; // Flag to track form validity
        inputs.forEach((input) => {
            validateField(input);
            if (input.classList.contains("invalid-input")) {
                allValid = false;
            }
        });

        if (allValid) {
            // If all fields are valid, show success message
            alert("Thank you! Your message has been sent successfully.");
            inputs.forEach((input) => {
                input.value = "";
            });
        }
    });

    // Add real-time validation to clear errors on input
    form.querySelectorAll("[data-error]").forEach((input) => {
        input.addEventListener("input", () => {
            const errorElementId = input.dataset.error;
            const errorElement = document.getElementById(errorElementId);

            // Remove invalid styles and hide the error message as user types
            input.classList.remove("invalid-input");
            errorElement.style.display = "none";

            if (input.name === "name") {
                document.getElementById("validNameError").style.display =
                    "none";
            }
        });
    });

    // Function to validate fields
    function validateField(input) {
        const errorElement = document.getElementById(input.dataset.error);
        const value = input.value.trim();

        // Validation rules
        const validationRules = {
            email: () => !isValidEmail(value),
            name: () => {
                const nameRegex = /^[a-zA-Z\s\-'/.]+$/;
                return (
                    !value ||
                    !nameRegex.test(value) ||
                    value.length < 2 ||
                    value.length > 50
                );
            },
            default: () => !value, // General validation for empty fields
        };

        // Determine the validation logic to use
        let validationType;

        if (input.name === "name") {
            validationType = "name";
        } else if (input.type) {
            validationType = input.type;
        } else {
            validationType = "default";
        }

        const isInvalid = (
            validationRules[validationType] || validationRules.default
        )();

        // Set validity based on the result
        if (isInvalid) {
            if (input.name === "name" && value) {
                setInvalid(input, document.getElementById("validNameError"));
            } else {
                setInvalid(input, errorElement);
            }

            if (input.type === "file") {
                uploadTrigger.classList.add("invalid-input");
            }
        } else {
            setValid(input, errorElement);
        }
    }

    // Helper function to mark input as invalid
    function setInvalid(input, errorElement) {
        input.classList.add("invalid-input");
        if (errorElement) errorElement.style.display = "block";
    }

    // Helper function to mark input as valid
    function setValid(input, errorElement) {
        input.classList.remove("invalid-input");
        if (errorElement) errorElement.style.display = "none";
    }

    // Function to check if an email is valid
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
