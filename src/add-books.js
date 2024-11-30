document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file-upload");
    const uploadTrigger = document.querySelector(".file-upload-btn");
    const imagePreview = document.getElementById("image-preview");
    const form = document.querySelector("form");
    let base64Image = "";

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
                base64Image = event.target.result;
                imagePreview.src = base64Image;
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

    // Clear file input, file preview, and all inputs on page load
    window.addEventListener("load", () => {
        const inputs = document.querySelectorAll("input");
        const selects = document.querySelectorAll("select");

        fileInput.value = "";
        imagePreview.style.display = "none";

        inputs.forEach((input) => {
            input.value = "";
        });

        selects.forEach((select) => {
            select.selectedIndex = 0; // Reset to the first option
        });
    });

    // Function to display image in a span with responsive styles
    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

        const style = document.createElement("style");
        style.textContent = `
                #image-span img {
                    max-width: 5rem;
                    border-radius: 1rem;
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

            if (input.name === "name") {
                document.getElementById("validNameError").style.display =
                    "none";
            }
        });
    });

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
        .addEventListener("click", function () {
            const title = document.getElementById("title-span").textContent;
            const author = document.getElementById("author-span").textContent;
            const publisher =
                document.getElementById("publisher-span").textContent;
            const category =
                document.getElementById("category-span").textContent;

            // generate bookID
            const bookID = `${getRandChar()}${getRandChar()}${
                Math.floor(Math.random() * 9000) + 1000
            }`;

            // Generate two random digits
            const num1 = Math.floor(Math.random() * 10); // First digit
            const num2 = Math.floor(Math.random() * 10); // Second digit
            const shelfLocation = `${getRandChar()}-${num1}-${num2}`;

            let bookData;
            try {
                bookData = JSON.parse(localStorage.getItem("newBookData"));
            } catch (error) {
                bookData = null;
            }

            const newBookDetail = Array.isArray(bookData) ? bookData : [];
            console.log("Fetched newBookDetail: ", newBookDetail);

            const bookDetail = {
                uploadedBookCover: base64Image,
                title: title,
                author: author,
                publisher: publisher,
                category: category,
                bookID: bookID,
                shelfLocation: shelfLocation,
                isAvailable: true,
            };

            newBookDetail.push(bookDetail);

            localStorage.setItem("newBookData", JSON.stringify(newBookDetail));
            window.location.href = "../pages/all-books.html";
        });

    function getRandChar() {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    function validateField(input) {
        const errorElement = document.getElementById(input.dataset.error);
        const value = input.value.trim();

        // Validation rules
        const validationRules = {
            SELECT: () => input.value === "Select a Category" || !input.value,
            file: () => !input.files || input.files.length === 0,
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
        if (input.tagName === "SELECT") {
            validationType = "SELECT";
        } else if (input.name === "name") {
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
});
