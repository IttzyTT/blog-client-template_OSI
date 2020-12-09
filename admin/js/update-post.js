window.onload = function() {
    dynamicalContent();
}

async function dynamicalContent() {

    //  Fill in the blanks:
    let urlParams = new URLSearchParams(window.location.search);
    let punId = urlParams.get("id");
    try {
        let response = await fetch(`http://localhost:3000/posts/${punId}`);
        let data = await response.json();

        document.getElementById("title").value = data.title;
        document.getElementById("author").value = data.author;
        document.getElementById("content").value = data.content;
        document.getElementById("tag").value = data.tag;

    } catch (error) {
        throw new Error(error);
    }

    //  Submit the changes
    submitChanges(punId);
}

async function submitChanges(punId) {
    let updateForm = document.getElementById("form-update-post");
    updateForm.addEventListener("submit", async function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        console.log(formData.get("content"));
        let formObject = {
            title: formData.get("title"),
            author: formData.get("author"),
            content: formData.get("content"),
            tags: formData.getAll('tags', 'value')
        }
        try {
            await fetch(`http://localhost:3000/posts/${punId}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(formObject)
            });
            window.location.replace('./index.html');
        } catch (error) {
            throw new Error(error);
        }
    })
}