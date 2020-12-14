let table = document.getElementById("table-manage-posts");

loadPosts();

async function loadPosts() {
    try {
        let postsResponse = await fetch("http://localhost:3000/posts");
        let postsData = await postsResponse.json();
        
        let dynTableContent = "";

        for (let post of postsData.reverse()) {
            let postDate = new Date(post.date);
            dynTableContent +=
            `<tr>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.tags.join(", ")}</td>
                <td>${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}</td>
                <td>
                    <a href="./update-post.html?id=${post._id}">
                        <button type="button">Update post</button>
                    </a>
                    <button type="button" class="delete-btn" data-post-id="${post._id}">Delete post</button>
                </td>
            </tr>`;
        }
        table.innerHTML += dynTableContent;
        deletePostBtn(); 

    } catch (error) {
        throw new Error(error);
    }
}

async function deletePostBtn() {
    try {
        let deleteBtns = document.querySelectorAll(".delete-btn");
    
        for (let btn of deleteBtns) {
            btn.addEventListener("click", async function() {
                await fetch(`http://localhost:3000/posts/${this.dataset.postId}`, {
                    method: "DELETE"
                });
                this.parentNode.parentNode.remove();
            })
        }
    } catch (error) {
        throw new Error(error);
    }
}