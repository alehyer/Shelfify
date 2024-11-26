document.addEventListener("DOMContentLoaded", () => {
    // Profile picture upload functionality
    const pictureUpload = document.getElementById("picture-upload");
    const bookCover = document.getElementById("book-cover");
    const changePictureBtn = document.querySelector(".change-picture-btn");

    // Load saved profile picture from localStorage
    const savedBookCover = localStorage.getItem("bookCover");
    if (savedBookCover) {
        bookCover.src = savedBookCover;
    }

    if (changePictureBtn && pictureUpload) {
        changePictureBtn.addEventListener("click", () => {
            pictureUpload.click();
        });

        pictureUpload.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const imageData = e.target.result;
                    bookCover.src = imageData;

                    // Save the image data to localStorage
                    localStorage.setItem("bookCover", imageData);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const data = JSON.parse(localStorage.getItem("bookData"));

    if (data) {
        // Define a field mapping of data keys to span IDs
        const fieldMapping = {
            Image: "book-cover",
            Title: "title-span",
            Author: "author-span",
            Publisher: "publisher-span",
            Category: "category-span",
            "Book ID": "bookID-span",
            "Shelf Location": "shelfLocation-span",
        };

        // Iterate over the field mapping
        Object.keys(fieldMapping).forEach((key) => {
            // Get the value from the data object using the key
            const value = data[key];

            // Find the corresponding span element by ID
            const span = document.getElementById(fieldMapping[key]);

            // Populate the span element with the value
            if (span == document.getElementById("book-cover") && value) {
                span.src = value;
            } else if (span && value) {
                span.textContent = value;
            }
        });

        const status = document.querySelector(".status-badge");
        const bookID = document.getElementById("bookID-span");
        if (bookID.textContent === "UW1231") {
            status.textContent = "Lent Out";
            status.style.backgroundColor = "red";
        }

        localStorage.removeItem("bookData");
    }
});
