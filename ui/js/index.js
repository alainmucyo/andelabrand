var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    console.log("clicked")
    showSlides(slideIndex += n);
}

function showSlides(n) {
    console.log("Slide index", n);
    var i;
    var slides = document.getElementsByClassName("slide");
    console.log(slides.length);
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "grid";
}