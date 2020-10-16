const selectQueries = async () => {
    try {
        const response = await fetch(`${BASE_URL}/query`,{
            headers: {
                Authorization: "Bearer " + token
            }
        })
        if (response.ok) {
            return await response.json()
        }
        if (response.status==401)
            logout()
    } catch (e) {
        return new Error("error")
    }
}
selectQueries().then(({data})=>{
    document.getElementById("loader-wrapper").style.display = "none";
    data.forEach(query => {
            document.getElementsByClassName("queries")[0].innerHTML += `
        <div class="query">
                <h4>
                    ${query.name}
                </h4>
                <p>
                    ${query.content}
                </p>
                <span>${query.email}</span>
            </div>
                      `
    });
}).catch(function (err) {
    document.getElementById("loader-wrapper").style.display = "none";
        document.getElementsByClassName("queries")[0].innerHTML = `
            <div class="text-danger pt-2 pl-2 pb-2"><h3>Error while fetching articles</h3></div>
            `
});