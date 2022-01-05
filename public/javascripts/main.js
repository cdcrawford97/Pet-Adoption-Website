//Implementing Dropdown Menu transition
function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("cross");
    });
}
navSlide();

/* When the user clicks on the account button,
toggle between hiding and showing the dropdown content */
function dropdownToggle(event){
    event.stopPropagation();
    document.querySelector(".account-dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    document.querySelector(".account-dropdown").classList.remove("show");
}

// toggles visiblity of comment reply form 
function myFunction(element) {
    const x = document.getElementById(element);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}