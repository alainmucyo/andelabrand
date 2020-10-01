const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('article');

const loadArticle = async () => {
    try {
        const response = await fetch(`${BASE_URL}/article/${article_id}`)
        if (response.ok) {
            return response.json()
        }
    } catch (e) {
        console.log(e)
        return null
    }
}
const selectArticles = async () => {

    try {
        const response = await fetch(`${BASE_URL}/article`)
        if (response.ok) {
            return await response.json()
        }
    } catch (e) {
        return new Error("error")
    }
}

loadArticle().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementsByClassName("article-text")[0].innerHTML = data.content
    document.getElementsByClassName("article-title")[0].innerHTML = data.title
    document.getElementsByClassName("article-image")[0].setAttribute("src", data.image)
    document.getElementById("likes").innerHTML = data.likes
    document.getElementById("comment-number").innerHTML = data.comments_count
    if (data.comments && data.comments.length > 0) {
        console.log("Comments: ", data.comments)
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
selectArticles().then(({data}) => {
    data.forEach(article => {
        document.getElementsByClassName("recommended-list")[0].innerHTML += `
             <a href="blog_details.html?article=${article._id}" class="recommended-article">
                    <img src="${article.image}" class="recommended-image" />
                    <div class="recommended-title">
                        ${article.title}
                    </div>
                </a>
            `
    })
})

function addLike() {
    fetch(`${BASE_URL}/article/like/${article_id}`, {method: "PUT"})
        .then(response => {
            if (response.ok) {
                const likes = document.getElementById("likes");
                likes.innerText = Number(likes.innerText) + 1
            }
        })
}

function addComment(event) {
    event.preventDefault();
    const names = document.getElementById("names");
    const content = document.getElementById("content");
    const submitBtn = document.getElementById("submitBtn");
    const namesValid = isInputValid(names, false, 3, 100);
    const contentValid = isInputValid(content, false, 5);
    if (!namesValid || !contentValid) return;

    const oldText = submitBtn.innerText;
    submitBtn.innerText = "Commenting..."
    const formData = new FormData();
    formData.append('names', names.value);
    formData.append('content', content.value);
    fetch(`${BASE_URL}/comment/${article_id}`, {method: "POST", body: formData})
        .then( response=> {
            if (response.ok) {
                submitBtn.innerHTML = oldText;
                document.getElementsByClassName("comments")[0].innerHTML += `
              <div class="comment">
                            <h3 class="comment-name">${names.value}</h3>
                            <div class="comment-body">
                                ${content.value}
                            </div>
                        </div>
            `
                const comments = document.getElementById("comment-number");
                comments.innerText = Number(comments.innerText) + 1
                document.getElementById("comment-form").reset();
            }
        })
}