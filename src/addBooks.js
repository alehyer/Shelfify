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
    
        // If any field is empty, return without submitting the form
        if (!bookTitleValue || !bookAuthorValue || !bookPublisherValue || bookCategoryValue === "Select a Category") {
            alert("Please fill in all required fields.");
            return;
        } 
        else { // allow user to preview and confirm to add book
            document.getElementById('bookDetail-panel').style.opacity = '0.15';
            // document.getElementsByTagName('menu')[0].style.opacity = '0.15';
            document.getElementById('confirmation-panel').style.display = 'flex';

            // replace the text with the values in input fields
            document.getElementById('title-span').textContent = bookTitleValue;
            document.getElementById('author-span').textContent = bookAuthorValue;
            document.getElementById('publisher-span').textContent = bookPublisherValue;
            document.getElementById('category-span').textContent = bookCategoryValue;

            //disable menu/nav buttons
            const menuItems = document.querySelectorAll('menu li');

            // Loop through each <li> element and apply the disabled styles
            menuItems.forEach(item => {
                item.style.pointerEvents = 'none'; // Disables interactions
            });
        }
    });

    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('bookDetail-panel').style.opacity = '1';
        // document.getElementsByTagName('menu')[0].style.opacity = '1';
        document.getElementById('confirmation-panel').style.display = 'none';

        // reenable menu/nav buttons
        const menuItems = document.querySelectorAll('menu li');

        // Loop through each <li> element and apply the disabled styles
        menuItems.forEach(item => {
            item.style.pointerEvents = 'auto'; 
        });

    });

    // confirm button redirects user, and transfer added new book info to to book details page
    document.getElementById('confirm-btn').addEventListener('click', function() {

    });
    
    // Remove the red outline as the user types
    function validateInput(event) {
        if (
            (event.type === 'input' && event.target.value.trim()) ||
            (event.type === 'change' && event.target.value !== "Select a Category")
        ) {
            event.target.classList.remove('invalid-input');
        }
    }

    // Attach the event listener to each field
    [bookTitle, bookAuthor, bookPublisher].forEach(input => {
        input.addEventListener('input', validateInput);
    });

    // Attach a change event for the category field
    bookCategory.addEventListener('change', validateInput);
   
});
