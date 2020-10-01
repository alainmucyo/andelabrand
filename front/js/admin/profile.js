const image = document.getElementById("image");
const submitBtn = document.getElementById("submit");
const loader = document.getElementById("container-loader");

/*
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementById("email").value = user.email;
        document.getElementById("name").value = user.displayName;
        var photoUrl = user.photoURL;
        if (photoUrl != null) {
            document.getElementById("profile-image").setAttribute("src", photoUrl)
        }
    } else {
        window.location = "../login.html"
    }
});
*/
const loadUser = async () => {
    try {
        const response = await fetch(`${BASE_URL}/auth/user`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok) {
            return await response.json()
        }
        if (response.status == 401)
            logout()

    } catch (e) {
        return null
    }
}
loadUser().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("email").value = data.email;
    document.getElementById("name").value = data.name;
    document.getElementById("profile-image").setAttribute("src", data.image)
}).catch(err => {
    console.log(err)
})

function submitProfile(event) {
    event.preventDefault()
    const displayNameInput = document.getElementById("name");
    const nameValid = isInputValid(displayNameInput, false, 3)
    const email = document.getElementById("email");
    const emailValid = isInputValid(email, true);
    const password = document.getElementById("password");
    const old_password = document.getElementById("old_password");
    const password_confirmation = document.getElementById("password_confirmation");
    if (!nameValid || !emailValid)
        return;
    const formData = new FormData();
    formData.append("name", displayNameInput.value)
    formData.append("email", email.value)
    if ((old_password.value).trim() != "") {
        if (password.value != password_confirmation.value) {
            password.classList.add("invalid");
            password_confirmation.classList.add("invalid")
            const password_invalid = document.getElementById("password_invalid")
            password_invalid.style.display = "block"
            password_invalid.innerText = "Password confirmation doesn't match."
            return
        }
        const passwordValid = isInputValid(password, false, 6)
        if (!passwordValid)
            return;
        formData.append("password", password.value)
        formData.append("old_password", old_password.value)
    }

    loader.style.display = "flex";
    submitBtn.innerHTML = "Updating profile....";
    if (image.files[0])
        formData.append("image", image.files[0])

    fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    })
        .then(async response => {
            if (response.ok) {
                loader.style.display = "none"
                submitBtn.innerText = "Submit"
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Profile updated successfully";
                alertSuccess.style.display = "block";
                document.getElementById("old_password").classList.remove("invalid")
                document.getElementById("password_confirmation").classList.remove("invalid")
                document.getElementById("old_password_invalid").style.display = "none"
                document.getElementById("password").value=""
                document.getElementById("password_confirmation").value=""
                document.getElementById("old_password").value=""
                const {data} = await response.json()
                document.getElementById("profile-image").setAttribute("src", data.user.image)
            } else {
                if (response.status === 422) {
                    document.getElementById("old_password").classList.add("invalid")
                    const {message} = await response.json()
                    const invalidMessage = document.getElementById("old_password_invalid")
                    invalidMessage.style.display = "block"
                    invalidMessage.innerText = message
                }
                throw Error
            }

        })
        .catch(() => {
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while updating profile.";
            alertDanger.style.display = "block";
            loader.style.display = "none"
            submitBtn.innerText = "Submit"
        })
}

/*function emailUpdater() {
    var user = firebase.auth().currentUser;
    var email = document.getElementById("email");
    var emailValid = isInputValid(email, true);
    if (!emailValid)
        return false;
    user.updateEmail(email.value).then(function () {
        console.log("Email updated")
    }).catch(function (error) {
        var alertDanger = document.getElementsByClassName("alert-danger")[0];
        alertDanger.innerHTML = error.message;
        alertDanger.style.display = "block";
    });
    return true
}*/

/*

function profileUpdateLogic(data) {
    var user = firebase.auth().currentUser;
    if (user) {
        console.log("Data: ", data)
        user.updateProfile(data)
            .then(resp => {
                loader.style.display = "none"
                submitBtn.innerText = "Submit"
                var alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Profile updated successfully";
                alertSuccess.style.display = "block";
            })
            .catch(() => {
                var alertDanger = document.getElementsByClassName("alert-danger")[0];
                alertDanger.innerHTML = "Error while updating profile.";
                alertDanger.style.display = "block";
                loader.style.display = "none"
                submitBtn.innerText = "Submit"
            })

    }
}*/
