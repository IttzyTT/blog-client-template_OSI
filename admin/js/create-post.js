let formPost = document.getElementById('form-post')

formPost.addEventListener('submit', createPost);

async function createPost(e){
    e.preventDefault();

    let formData = new FormData(this)

    //console.log(formatFormData(formData));
    // console.log(document.getElementById('content').value)
    // console.log(document.getElementById('tag').value)
    // console.log(formData.get('content'))
    // console.log(formData.get('tags'))

let objectPost = {
    title: formData.get('title'),
    author: formData.get('author'),
    content: formData.get('content'),
    tags: formData.getAll('tags', 'value') //get all values selected from <form select>
}

//console.log(objectPost)
try{

await fetch('http://localhost:3000/posts', { 

method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify(objectPost)

});
window.location.replace('index.html')

}catch(message){
    throw new Error(message);

}


}



