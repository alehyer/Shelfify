document.addEventListener('DOMContentLoaded', function () {
    const bookTitle = document.getElementById('book-title');
    const bookAuthor = document.getElementById('book-author');
    const bookPublisher = document.getElementById('book-publisher');
    const bookCategory = document.getElementById('book-category');

    // function when home buttons are clicked
    document.querySelectorAll('.redirect-home').forEach( function(element) {
        element.addEventListener('click', function () {
            window.location.href = `../pages/home.html`;
        });
    });

    // function for addBook button
    document.getElementById('addBook-btn').addEventListener('click', function () {
        const bookTitleValue = bookTitle.value.trim();
        const bookAuthorValue = bookAuthor.value.trim();
        const bookPublisherValue = bookPublisher.value.trim();
        const bookCategoryValue = bookCategory.value.trim();
    
        // Reset all outlines before applying new ones
        bookTitle.classList.remove('invalid-input');
        bookAuthor.classList.remove('invalid-input');
        bookPublisher.classList.remove('invalid-input');
        bookCategory.classList.remove('invalid-input');
    
        // Apply red outline for invalid fields
        if (!bookTitleValue) {
            bookTitle.classList.add('invalid-input');
        }
        if (!bookAuthorValue) {
            bookAuthor.classList.add('invalid-input');
        }
        if (!bookPublisherValue) {
            bookPublisher.classList.add('invalid-input');
        }
        if (bookCategoryValue === "Select a Category") {
            bookCategory.classList.add('invalid-input');
        }
    
        // If any field is empty, return without submitting the form
        if (!bookTitleValue || !bookAuthorValue || !bookPublisherValue || bookCategoryValue === "Select a Category") {
            alert("Please fill in all required fields.");
            return;
        }
    });
    
    // Remove the red outline as the user types
    bookTitle.addEventListener('input', function () {
        if (this.value.trim()) {
            this.classList.remove('invalid-input');
        }
    });
    
    bookAuthor.addEventListener('input', function () {
        if (this.value.trim()) {
            this.classList.remove('invalid-input');
        }
    });
    
    bookPublisher.addEventListener('input', function () {
        if (this.value.trim()) {
            this.classList.remove('invalid-input');
        }
    });
    
    bookCategory.addEventListener('change', function () {
        if (this.value !== "Select a Category") {
            this.classList.remove('invalid-input');
        }
    });
    

        // allow user to preview and confirm to add book
        // document.getElementById('bookDetail-panel').style.display = 'none';
        // document.getElementById('confirmation-panel').style.display = 'block';

        console.log("Book Title: " + bookTitle);
        console.log("Book Author: " + bookAuthor);
        console.log("Book Publisher: " + bookPublisher);
        console.log("Book Category: " + bookCategory);
});
