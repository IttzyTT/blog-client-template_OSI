const loremBtn = document.getElementById('lorem-txt');
const loremtContainer = document.getElementById('content');

loremBtn.addEventListener('click', function () {
  let loremHTML = '';
  loremHTML +=
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad repudiandae voluptates aliquam dignissimos aspernatur? Quod quisquam illum nesciunt at sed, blanditiis libero dolorem non eum sunt dolor accusamus. Nemo quas est ea expedita? Officiis sit temporibus ea, accusamus necessitatibus quaerat culpa repellat esse sed mollitia blanditiis alias? Enim temporibus eos nam dicta voluptatum et commodi. Mollitia exercitationem eius atque vero fugit rem et vitae! Itaque nihil molestias minus mollitia corrupti repellendus. Repellat inventore dignissimos accusamus fugit? Perspiciatis neque optio aspernatur ullam quam? Error enim, quam quod laborum officia quaerat! Doloribus excepturi est doloremque, magni aut hic expedita ea esse animi eligendi! Aliquam, eum molestias explicabo aperiam aliquid illo magni doloribus odit vero laborum cum ipsam sequi, architecto et at tempora qui eveniet, unde nobis eaque eius! Esse, voluptatem sed mollitia odio officiis veritatis inventore nihil saepe ducimus aspernatur. Optio, quod molestias eos sint veniam consectetur omnis veritatis explicabo cum? Earum.';

  loremtContainer.innerText = loremHTML;
});

let formPost = document.getElementById('form-post');

formPost.addEventListener('submit', createPost);

async function createPost(e) {
  e.preventDefault();

  let formData = new FormData(this);

  //console.log(formatFormData(formData));
  // console.log(document.getElementById('content').value)
  // console.log(document.getElementById('tag').value)
  // console.log(formData.get('content'))
  // console.log(formData.get('tags'))

  let objectPost = {
    title: formData.get('title'),
    author: formData.get('author'),
    content: formData.get('content'),
    tags: formData.getAll('tags', 'value'), //get all values selected from <form select>
  };

  //console.log(objectPost)
  try {
    await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objectPost),
    });
    window.location.replace('index.html');
  } catch (message) {
    throw new Error(message);
  }
}
