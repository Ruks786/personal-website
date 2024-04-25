/* Toggle Navbar */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () =>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar(){
    document.querySelector(".header").classList.toggle("active");
}


/* Active  */
document.addEventListener("click",(e) =>{
    if(e.target.classList.contains("link-items")&& e.target.hash !== ""){
        //activate the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        const hash = e.target.hash;
        if(e.target.classList.contains("nav-items")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() =>{
            document.querySelector("section.active").classList.remove("active","fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        },500);
    }
});


/* About Tabs */
const tabscontainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");

tabscontainer.addEventListener("click", (e) =>{
    if(e.target.classList.contains("tab-items")&& !e.target.classList.contains("active")){
        tabscontainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});

