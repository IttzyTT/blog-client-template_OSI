const postContainer = document.getElementById('post-container');

loadPost();

async function loadPost() {
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get('id');
  try {
    let response = await fetch(`http://localhost:3000/posts/${postId}`);
    let data = await response.json();

    console.log(data);
    console.log(data.author);

    let postHTML = '';
    let postDate = new Date(data.date);
    const monthName = postDate.toLocaleString('default', { month: 'short' });
    postHTML += '<div class="post-singel">';
    postHTML += '<div class="postleft">';
    postHTML += `<p class="date">${monthName} <br>
    ${postDate.getDate()} </p>`;
    postHTML += '</div>';
    postHTML += '<div class="postright">';
    postHTML += `<h3 class="title">${data.title}</h3>`;
    postHTML += `<i class="author">A post by ${data.author}</i>`;
    postHTML += `<p class="post-txt">${data.content}</p>`;
    postHTML += `<b class="tags">Tags: ${data.tags.join(', ')}</b>`;
    postHTML += '</div>';
    postHTML += '</div>';

    postContainer.innerHTML = postHTML;
  } catch (error) {
    throw new Error(error);
  }
}
