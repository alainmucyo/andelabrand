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
selectArticles().then(({data}) => {
    document.getElementById("loader-wrapper").style.display = "none";
    data.forEach(article => {
        document.getElementsByClassName("cards")[0].innerHTML += `
             <div class="card">
                <a class="card-img" href="blog_details.html?article=${article._id}"><img src="${article.image}" alt="Image"></a>
                <div class="card-details">
                    <a href="blog_details.html?article=${article._id}" class="card-title">
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
    console.log("Error: " + err)
    document.getElementById("loader-wrapper").style.display = "none";
    document.getElementsByClassName("cards")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
})