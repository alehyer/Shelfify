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
});
