window.onload = function() {
    dynamicalContent();
}
let selectedTagsArray = [];

async function dynamicalContent() {

    //  Fill in the blanks:
    let urlParams = new URLSearchParams(window.location.search);
    let postId = urlParams.get("id");
    try {
        let response = await fetch(`http://localhost:3000/posts/${postId}`);
        let data = await response.json();

        document.getElementById("title").value = data.title;
        document.getElementById("author").value = data.author;
        document.getElementById("content").value = data.content;
        preselectTags(data);
        newFormSelectBehavior();

    } catch (error) {
        throw new Error(error);
    }

    //  Submit the changes
    submitChanges(postId);
}

async function submitChanges(postId) {
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
            await fetch(`http://localhost:3000/posts/${postId}`, {
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

async function preselectTags(data) {
    let htmlTags = document.getElementById("tags");
        for (let i = 0; i < htmlTags.options.length; i++) {
            for (let tag of data.tags) {
                if (htmlTags.options[i].value === tag) {
                    htmlTags.options[i].selected = true;
                    selectedTagsArray.push(htmlTags.options[i].index);
                }
            }
        }
}

async function newFormSelectBehavior() {
    let tagsSelectElement = document.getElementById("tags");
    
    for (let option of tagsSelectElement.children) {
        option.addEventListener("click", function() {
            if (selectedTagsArray.includes(this.index)) {
                this.selected = false;
                selectedTagsArray = selectedTagsArray.filter((value) => {  return value !== this.index  })
            } else {
                selectedTagsArray.push(option.index);
            }
            for (let index of selectedTagsArray) {
                tagsSelectElement.options[index].selected = true;
            }
        });
    }
}