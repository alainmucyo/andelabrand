let slideIndex = 1;
showSlides(slideIndex);
setInterval(() => {
    plusSlides(1)
}, 5000)

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("slide");
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
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const submitBtn = document.getElementById("submit");
    const name_valid = isInputValid(name, false, 3, 20);
    const email_valid = isInputValid(email, true);
    const message_valid = isInputValid(message, false, 10)
    if (!name_valid || !email_valid || !message_valid)
        return;
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Sending message....";
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('content', message.value);
    fetch(`${BASE_URL}/query`, {method: "POST", body: formData})
        .then( response=> {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementById("contact_form").reset();
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Message sent successfully";
                alertSuccess.style.display = "block";
            }
        })
        .catch(function (error) {
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while sending the message.";
            alertDanger.style.display = "block";
        });
});
