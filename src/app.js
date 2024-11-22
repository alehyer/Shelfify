document.addEventListener("DOMContentLoaded", function () {
	// nav bar function
	const menuToggle = document.querySelector(".menu-toggle");
	const menuItems = document.querySelector(".right-group");
	menuToggle.addEventListener("click", () => {
		menuItems.classList.toggle("active"); // Toggle the active class
		menuToggle.classList.toggle("rotated");
	});
});
