document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-upload');
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookPublisher = document.getElementById('book-publisher');
    const bookCategory = document.getElementById('book-category');
    const backButton = document.getElementById('backPage-btn');
    
    backButton.disabled = false;
    // nav bar function
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".right-group");
    menuToggle.addEventListener("click", () => {
        menuItems.classList.toggle("active"); // Toggle the active class
        menuToggle.classList.toggle("rotated");
        backButton.classList.toggle('hiddenBtn');
    });

    // function when home buttons are clicked
    document.querySelectorAll('.redirect-home').forEach( function(element) {
        element.addEventListener('click', function () {
            window.location.href = `../pages/home.html`;
        });
    });

    backButton.addEventListener('click', function() {
       window.location.href = `../pages/home.html`; // change this to the previous page html. 
    });


    // upload file btn
    document.querySelector(".file-upload-btn").addEventListener("click", () => {
        document.getElementById("file-upload").click();
    });

    // preview image
    document.getElementById("file-upload").addEventListener("change", (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
    
            reader.onload = (event) => {
                // Set the uploaded image as the src of the <img> element
                const imagePreview = document.getElementById("image-preview");
                imagePreview.src = event.target.result;
                imagePreview.style.display = "block"; // Make the image visible
                displayInSpan(event.target.result);
            };
    
            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            alert("Please upload a valid image file.");
            e.target.value = ""; // Clear the invalid file
        }
    });

    window.addEventListener('load', () => {
        const fileInput = document.getElementById("file-upload");
        fileInput.value = ""; // Clear the file input

        // Optionally, clear the image preview (if applicable)
        const imagePreview = document.getElementById("image-preview");
        imagePreview.style.display = "none"; // Hide the image preview
    });
    

    // function for addBook button
    document.getElementById('addBook-btn').addEventListener('click', function () {
        const bookTitleValue = bookTitle.value.trim();
        const bookAuthorValue = bookAuthor.value.trim();
        const bookPublisherValue = bookPublisher.value.trim();
        const bookCategoryValue = bookCategory.value.trim();
    
        // Reset all outlines before applying new ones
        document.querySelector('.file-upload-btn').classList.remove('invalid-input');
        bookTitle.classList.remove('invalid-input');
        bookAuthor.classList.remove('invalid-input');
        bookPublisher.classList.remove('invalid-input');
        bookCategory.classList.remove('invalid-input');
    
        // Apply red outline for invalid fields
        // Define an array of fields with their respective validation conditions
        const fields = [
            { element: bookTitle, isValid: bookTitleValue},
            { element: bookAuthor, isValid: bookAuthorValue},
            { element: bookPublisher, isValid: bookPublisherValue},
            { element: bookCategory, isValid: bookCategoryValue !== "Select a Category" }
        ];

        // Loop through each field to apply the validation
        fields.forEach(({ element, isValid }) => {
            if (!isValid) {
                element.classList.add('invalid-input');
            }
        });
        
        if (!(fileInput.files.length > 0)) {
            document.querySelector('.file-upload-btn').classList.add('invalid-input');
        }

        // If any field is empty, return without submitting the form
        if (fileInput.files.length <= 0 || !bookTitleValue || !bookAuthorValue || !bookPublisherValue || bookCategoryValue === "Select a Category") {
            alert("Please fill in all required fields.");
            return;
        } 
        else { // allow user to preview and confirm to add book
            document.getElementById('bookDetail-panel').style.opacity = '0';
            backButton.classList.toggle('hiddenBtn');
            document.getElementById('confirmation-panel').style.display = 'flex';

            // replace the text with the values in input fields
            document.getElementById('title-span').textContent = bookTitleValue;
            document.getElementById('author-span').textContent = bookAuthorValue;
            document.getElementById('publisher-span').textContent = bookPublisherValue;
            document.getElementById('category-span').textContent = bookCategoryValue;
        }
    });

    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('bookDetail-panel').style.opacity = '1';
        backButton.classList.toggle('hiddenBtn');
        document.getElementById('confirmation-panel').style.display = 'none';

    });

    // confirm button redirects user, and transfer added new book info to to book details page
    document.getElementById('confirm-btn').addEventListener('click', function() {

    });
    
    function displayInSpan(imageData) {
        const span = document.getElementById("image-span");
        span.innerHTML = `<img src="${imageData}" alt="Uploaded Image">`;

        // Add a <style> block with media queries dynamically
        const style = document.createElement('style');
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


    // Remove the red outline as the user types
    function validateInput(event) {
        const target = event.target;
    
        // Handle text inputs
        if (event.type === 'input' && target.value.trim()) {
            target.classList.remove('invalid-input');
        }
        // Handle category selection
        else if (event.type === 'change' && target === bookCategory && target.value !== "Select a Category") {
            target.classList.remove('invalid-input');
        }
        // Handle file input
        else if (event.type === 'change' && target === fileInput && fileInput.files.length > 0) {
            document.querySelector('.file-upload-btn').classList.remove('invalid-input');
        }
    }
    
    // Attach the event listener to text inputs
    [bookTitle, bookAuthor, bookPublisher].forEach(input => {
        input.addEventListener('input', validateInput);
    });
    
    // Attach a change event for the category and file input fields
    [bookCategory, fileInput].forEach(field => {
        field.addEventListener('change', validateInput);
    });
});
