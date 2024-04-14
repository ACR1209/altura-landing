/**
 * Function to handle the behavior of the navbar on scroll.
 *
 */
function handleScrollNavbar() {
    const navbar = document.getElementById("navbar");
    
    if (window.scrollY > 0) {
        navbar.classList.add("bg-white", "shadow-lg");
    } else {
        navbar.classList.remove("bg-white", "shadow-lg");
    }
}

function handleSectionClick() {
    const itemsWithId = document.querySelectorAll("[data-id]");
    itemsWithId.forEach((item) => {
        item.addEventListener("click", () => {
            // scroll to section with same id minus the navbar height
            const sectionId = item.getAttribute("data-id");
            const section = document.getElementById(sectionId);
            
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

}

function init() {
    window.addEventListener("scroll", () => {
        handleScrollNavbar();
    });
    handleSectionClick();
    handleScrollNavbar();
}

document.addEventListener("DOMContentLoaded", init);