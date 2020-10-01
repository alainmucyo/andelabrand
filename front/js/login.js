const token = localStorage.getItem("token")
if (token) {
    window.location = "admin";
}

function login(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("login_btn");
    const loader = document.getElementById("container-loader");

    const validEmail = isInputValid(emailInput, true)
    const validPassword = isInputValid(passwordInput)

    if (!validEmail || !validPassword)
        return;
    loader.style.display = "flex";
    loginBtn.innerText = "Logging in...";
    const email = emailInput.value;
    const password = passwordInput.value;
    const formData = new FormData();
    formData.append('password', password);
    formData.append('email', email);
    fetch(`${BASE_URL}/auth/login`, {method: "POST", body: formData})
        .then(response => {
            loader.style.display = "none";
            if (response.ok) {
                response.json().then(({data}) => {
                    localStorage.setItem("token", data.token)
                    window.location = "admin/index.html";
                })
                    .catch(() => {
                        throw Error("Error")
                    })

            } else {
                throw Error("Error")
            }
        })
        .catch(function (error) {
            loader.style.display = "none";
            document.getElementById("invalid").style.display = "inline-block";
            emailInput.classList.add("invalid");
            passwordInput.classList.add("invalid");
            loginBtn.innerText = "Login";
        });
}
