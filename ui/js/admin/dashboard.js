var db = firebase.firestore();
loadArticles();

function loadArticles() {
    var blog_count=0;
    db.collection("articles").get().then((querySnapshot) => {
        document.getElementById("loader-wrapper").style.display = "none";
        querySnapshot.forEach((doc) => {
            blog_count++;
            var data = doc.data();
            var id = doc.id;
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
        document.getElementById("blog-count").innerText=blog_count+" Blog articles";
    }).catch(function (err) {
        document.getElementById("loader-wrapper").style.display = "none";
        document.getElementsByClassName("cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
    });

}