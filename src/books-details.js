document.addEventListener("DOMContentLoaded", () => {
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

        if (data.isAvailable === "false") {
            status.textContent = "Lent Out";
            status.style.backgroundColor = "red";
        }
    }
});
