document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const uploadTrigger = document.querySelector(".file-upload-btn");
    const imagePreview = document.getElementById("image-preview");
    const form = document.querySelector("form");

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

    // Function to display image in a span with responsive styles
    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

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
            console.log("Form is valid!");
            // Handle form success (e.g., send data or show a success message)
            document.getElementById("bookDetail-panel").style.display = "none";
            document.getElementById("confirmation-panel").style.display =
                "flex";

            // Map of input field IDs to span IDs
            const fieldMapping = {
                "book-title": "title-span",
                "book-author": "author-span",
                "book-publisher": "publisher-span",
                "book-category": "category-span",
            };

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
        const errorElementId = input.dataset.error;
        const errorElement = document.getElementById(errorElementId);

        if (input.tagName === "SELECT") {
            // Validate <select> elements
            if (input.value === "Select a Category" || !input.value) {
                setInvalid(input, errorElement);
            } else {
                setValid(input, errorElement);
            }
        } else if (input.type === "file") {
            // Validate file inputs
            if (!input.files || input.files.length === 0) {
                setInvalid(input, errorElement);
                uploadTrigger.classList.add("invalid-input");
            } else {
                setValid(input, errorElement);
            }
        } else {
            // Validate general inputs
            const value = input.value.trim();
            if (!value) {
                setInvalid(input, errorElement);
            } else {
                setValid(input, errorElement);
            }
        }
    }

    function validateField(input) {
        const errorElement = document.getElementById(input.dataset.error);
        const value = input.value.trim();

        // Validation rules
        const validationRules = {
            SELECT: () => input.value === "Select a Category" || !input.value,
            file: () => !input.files || input.files.length === 0,
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

    // cancel button displays back input fields
    document
        .getElementById("cancel-btn")
        .addEventListener("click", function () {
            document.getElementById("bookDetail-panel").style.display = "flex";
            document.getElementById("confirmation-panel").style.display =
                "none";
        });

    // confirm button redirects user, and transfer added new book info to to book details page
    document
        .getElementById("confirm-btn")
        .addEventListener("click", function () {});
});
