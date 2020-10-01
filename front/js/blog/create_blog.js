document.getElementById("blog_form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("title");
    const body = document.getElementById("body");
    const submitBtn = document.getElementById("submit");
    const file = document.getElementById("image").files[0];
    const loader = document.getElementById("container-loader");
    const titleValid = isInputValid(title, false, 3, 100);
    const bodyValid = isInputValid(body, false, 10);

    if (!titleValid || !bodyValid)
        return

    loader.style.display = "flex";
    const oldText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Creating new article....";
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('content', body.value);
    formData.append("image", file)
    fetch(BASE_URL + "/article", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementById("blog_form").reset();
                $('#body').trumbowyg('html', "");
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Article created successfully";
                alertSuccess.style.display = "block";
                loader.style.display = "none";
            } else {
                if (response.status==401)
                    logout()
                throw Error("Error")
            }
        })
        .catch(function (error) {
            submitBtn.innerHTML = oldText;
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while creating the article.";
            alertDanger.style.display = "block";
            loader.style.display = "none";
        });
})