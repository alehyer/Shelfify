document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const uploadTrigger = document.querySelector(".file-upload-btn");
    const imagePreview = document.getElementById("image-preview");
    const form = document.querySelector("form");
    const phoneInput = document.getElementById("phone-no");

    phoneInput.addEventListener("input", () => {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove non-numeric characters
        if (value.startsWith("60")) {
            value =
                "+60" +
                value.slice(2, 4) +
                " " +
                value.slice(4, 7) +
                " " +
                value.slice(7);
        }
        phoneInput.value = value.trim();
    });

    // Trigger file input on button click
    uploadTrigger.addEventListener("click", () => {
        fileInput.click();
    });

    // Preview the uploaded image
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagePreview.src = event.target.result;
                imagePreview.style.display = "block"; // Show the image preview
                displayInSpan(event.target.result); // Display the image in span

                // Clear invalid-input class
                setValid(
                    uploadTrigger,
                    document.getElementById(fileInput.dataset.error)
                );
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file.");
            e.target.value = ""; // Clear the invalid file
        }
    });

    // Clear file input and preview on page load
    window.addEventListener("load", () => {
        fileInput.value = "";
        imagePreview.style.display = "none";
    });

    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

        // Add a <style> block with media queries dynamically
        const style = document.createElement("style");
        style.textContent = `
            #image-span img {
                max-width: 5rem;
            }

            @media (min-width: 768px) {
                #image-span img {
                    max-width: 6rem;
                }
            }

            @media (min-width: 1024px) {
                #image-span img {
                    max-width: 7rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Form submission handler
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        const inputs = form.querySelectorAll("[data-error]");
        let allValid = true;

        // Validate all inputs
        inputs.forEach((input) => {
            validateField(input);
            if (input.classList.contains("invalid-input")) {
                allValid = false;
            }
        });

        // If all fields are valid, proceed
        if (allValid) {
            // Handle form success (e.g., send data or show a success message)
            document.getElementById("userDetail-panel").style.display = "none";
            document.getElementById("confirmation-panel").style.display =
                "flex";

            // Map of input field IDs to span IDs
            const fieldMapping = {
                "user-type": "userType-span",
                email: "email-span",
                "phone-no": "phone-span",
            };

            // Helper function to get and trim input value by ID
            function getTrimmedValue(id) {
                return document.getElementById(id)?.value.trim() || "";
            }

            // Set full name
            const firstName = getTrimmedValue("first-name");
            const lastName = getTrimmedValue("last-name");
            document.getElementById(
                "name-span"
            ).textContent = `${firstName} ${lastName}`;

            // Set address
            const streetAddress = getTrimmedValue("street-address");
            const city = getTrimmedValue("city-address");
            const zipcode = getTrimmedValue("zip-code");
            const state = getTrimmedValue("state-address");
            document.getElementById(
                "address-span"
            ).textContent = `${streetAddress}, ${zipcode} ${city}, ${state}`;

            // Loop through the mapping and set text content
            Object.entries(fieldMapping).forEach(([inputId, spanId]) => {
                const inputValue = document
                    .getElementById(inputId)
                    .value.trim();
                document.getElementById(spanId).textContent = inputValue;
            });
        }
    });

    // Real-time validation for inputs
    form.querySelectorAll("[data-error]").forEach((input) => {
        input.addEventListener("input", () => {
            const errorElementId = input.dataset.error;
            const errorElement = document.getElementById(errorElementId);

            // Remove invalid styles and hide the error message as user types
            input.classList.remove("invalid-input");
            errorElement.style.display = "none";
        });
    });

    // Validate individual fields
    function validateField(input) {
        const errorElement = document.getElementById(input.dataset.error);
        const value = input.value.trim();

        // Validation rules
        const validationRules = {
            SELECT: () => input.value === "Select User" || !input.value,
            file: () => !input.files || input.files.length === 0,
            tel: () => value.length < 14 || !value.startsWith("+60"),
            email: () => !isValidEmail(value),
            default: () => !value, // General validation for empty fields
        };

        // Determine the validation logic to use
        const validationType =
            input.tagName === "SELECT" ? "SELECT" : input.type || "default";
        const isInvalid = (
            validationRules[validationType] || validationRules.default
        )();

        // Set validity based on the result
        if (isInvalid) {
            setInvalid(input, errorElement);
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

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    document
        .getElementById("cancel-btn")
        .addEventListener("click", function () {
            document.getElementById("userDetail-panel").style.display = "flex";
            document.getElementById("confirmation-panel").style.display =
                "none";
        });

    document
        .getElementById("confirm-btn")
        .addEventListener("click", function () {});
});
