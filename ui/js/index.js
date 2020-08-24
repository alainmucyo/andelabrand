var slideIndex = 1;
showSlides(slideIndex);
setInterval(()=>{
    plusSlides(1)
},5000)
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
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

document.getElementById("contact_form").addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var submitBtn = document.getElementById("submit");
    var oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending message....";
    var db = firebase.firestore();
    db.collection("queries").add({
        name, email, message
    })
        .then(function (docRef) {
            submitBtn.innerHTML = oldText;
            document.getElementById("contact_form").reset();
            var alertSuccess=document.getElementsByClassName("alert-success")[0];
            alertSuccess.innerHTML="Message sent successfully";
            alertSuccess.style.display="block";
        })
        .catch(function (error) {
            var alertDanger=document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML="Error while sending the message.";
            alertDanger.style.display="block";
        });
});


