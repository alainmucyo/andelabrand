const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('article');
$('#body').trumbowyg();
const loadArticle = async () => {
    try {
        const response = await fetch(`${BASE_URL}/article/${article_id}`)
        if (response.ok) {
            return await response.json()
        }
    } catch (e) {
        console.log(e)
        return null
    }
}
loadArticle().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("title").value = data.title;
    $('#body').trumbowyg('html', data.content);
    document.getElementById("likes").innerHTML = data.likes
    document.getElementById("comment-number").innerHTML = data.comments_count
    document.getElementById("views").innerHTML = data.views
    if (data.comments && data.comments.length > 0) {
        data.comments.forEach(comment => {
            document.getElementsByClassName("comments")[0].innerHTML += `
              <div class="comment">
                            <h3 class="comment-name">${comment.names}</h3>
                            <div class="comment-body">
                                ${comment.content}
                            </div>
                        </div>
            `
        })
    }

})
    .catch(err => {
        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementsByClassName("article-details")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Article not found</h3></div>
            `
    })

function updateBlog(event) {
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
    if (file)
        formData.append("image", file)
    fetch(`${BASE_URL}/article/${article_id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + token
        },
        body: formData
    })
        .then(response => {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                const alertSuccess = document.getElementsByClassName("alert-success")[0];
                alertSuccess.innerHTML = "Article updated successfully";
                alertSuccess.style.display = "block";
                loader.style.display = "none";
            } else {
                if (response.status == 401)
                    logout()
                throw Error("Error")
            }
        })
        .catch(function (error) {
            submitBtn.innerHTML = oldText;
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while updating the article.";
            alertDanger.style.display = "block";
            loader.style.display = "none";
        });
}

function deleteArticle(event) {
    event.preventDefault();
    if (!confirm("Delete this article?")) return;
    const deleteBtn = document.getElementById("delete");
    deleteBtn.innerText = "Deleting....";
    fetch(`${BASE_URL}/article/${article_id}`, {
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then(response => {
            if (response.ok)
                window.location = "index.html"
            else {
                if (response.status == 401)
                    logout()
                throw Error("Error")
            }

        }).catch(function (error) {
        deleteBtn.innerText = "Delete";
        alert("Error while deleting!")
    });
}

/*
function updateBlog(event) {
    event.preventDefault();
    const title = document.getElementById("title");
    const file = document.getElementById("image").files[0];
    const body = document.getElementById("body");
    const loader = document.getElementById("container-loader");
    const titleValid = isInputValid(title, false, 3, 100);
    const bodyValid = isInputValid(body, false, 10);

    if (!titleValid || !bodyValid) {
        return
    }

    loader.style.display = "flex";
    const values = {title: title.value, body: body.value};
    const submitBtn = document.getElementById("submit");
    submitBtn.innerHTML = "Editing article....";
    fileUploader(file).then(({imgUrl}) => {
        uploadLogic({...values, imgUrl}, submitBtn, loader)
    })
        .catch(err => {
            uploadLogic(values, submitBtn, loader)
        })
}

function uploadLogic(form, submitBtn, loader) {
    console.log(form)
    db.collection("articles").doc(article).update({
        ...form
    })
        .then(function (docRef) {
            submitBtn.innerHTML = "Edit Article";
            const alertSuccess = document.getElementsByClassName("alert-success")[0];
            alertSuccess.innerHTML = "Article updated successfully";
            alertSuccess.style.display = "block";
            loader.style.display = "none";
        })
        .catch(function (error) {
            const alertDanger = document.getElementsByClassName("alert-danger")[0];
            alertDanger.innerHTML = "Error while updating the article.";
            alertDanger.style.display = "block";
            loader.style.display = "none";
        });
}

function loadComments() {
    db.collection("comments").where("article_id", "==", article).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            document.getElementsByClassName("comments")[0].innerHTML += `
              <div class="comment">
                            <h3 class="comment-name">${data.names}</h3>
                            <div class="comment-body">
                                ${data.content}
                            </div>
                        </div>
            `
        });
    })
}

f
}*/
