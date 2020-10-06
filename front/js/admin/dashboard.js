
const adminReports = async () => {
    try {
        const response = await fetch(`${BASE_URL}/admin/reports`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok)
            return await response.json()

        if (response.status == 401)
            logout()
    } catch (e) {
        return new Error("error")
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
adminReports().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementById("blog-count").innerText = data.articles + " Blog articles";
    document.getElementById("blog_likes").innerText = data.likes;
    document.getElementById("blog_comments").innerText = data.comments;
    document.getElementById("blog_views").innerText = data.views;
    document.getElementById("contacts").innerText = data.queries;
}).catch(err => {
    console.log(err)
})
selectArticles().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    data.forEach(article => {
        document.getElementsByClassName("cards")[0].innerHTML += `
             <div class="card">
                <a class="card-img" href="edit_blog.html?article=${article._id}"><img src="${article.image}" alt="Image"></a>
                <div class="card-details">
                    <a href="edit_blog.html?article=${article._id}" class="card-title">
                       ${article.title}
                    </a>
                </div>
                <div class="card-icons">
                    <div class="icon">
                        <i class="ti-heart"></i>
                        <span class="icon-number">${article.likes}</span>
                    </div>
                    <div class="icon">
                        <i class="ti-comment"></i>
                        <span class="icon-number">${article.comments_count}</span>
                    </div>
                    <div class="icon">
                        <i class="ti-eye"></i>
                        <span class="icon-number">${article.views}</span>
                    </div>
                </div>
            </div>
            `
    })
}).catch(err => {
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementsByClassName("cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
})
/*
function loadArticles() {
    var blog_count = 0;
    var likes = 0;
    var comments = 0;
    var views = 0;
    var queries = 0;
    db.collection("queries").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            queries++
        })
        document.getElementById("contacts").innerText = queries;
    })
    db.collection("articles").get().then((querySnapshot) => {
        document.getElementById("loader-wrapper").style.display = "none";
        querySnapshot.forEach((doc) => {
            blog_count++;
            var data = doc.data();
            var id = doc.id;
            likes += data.likes;
            comments += data.comments;
            views += data.views;
            document.getElementsByClassName("cards")[0].innerHTML += `
             <div class="card">
                <a class="card-img" href="edit_blog.html?article=${id}"><img src="${data.imgUrl}" alt="Image"></a>
                <div class="card-details">
                    <a href="edit_blog.html?article=${id}" class="card-title">
                       ${data.title}
                    </a>
                </div>
                <div class="card-icons">
                    <div class="icon">
                        <i class="ti-heart"></i>
                        <span class="icon-number">${data.likes}</span>
                    </div>
                    <div class="icon">
                        <i class="ti-comment"></i>
                        <span class="icon-number">${data.comments}</span>
                    </div>
                    <div class="icon">
                        <i class="ti-eye"></i>
                        <span class="icon-number">${data.views}</span>
                    </div>
                </div>
            </div>
            `
        });
        document.getElementById("blog-count").innerText = blog_count + " Blog articles";
        document.getElementById("blog_likes").innerText = likes;
        document.getElementById("blog_comments").innerText = comments;
        document.getElementById("blog_views").innerText = views;
    }).catch(function (err) {
        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementsByClassName("cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
    });

}*/
