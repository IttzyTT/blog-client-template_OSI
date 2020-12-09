const postContainer = document.getElementById('posts');

loadPosts();

async function loadPosts() {
  try {
    let postsResponse = await fetch('http://localhost:3000/posts');
    let postsData = await postsResponse.json();

    let postHTML = '';
    for (let post of postsData.reverse()) {
      let postDate = new Date(post.date);
      const monthName = postDate.toLocaleString('default', { month: 'short' });
      console.log(monthName);
      postHTML += `<div class="post">`;
      postHTML += `<div class="date-container">`;
      postHTML += `<p class="date">
                        ${monthName}<br>
                        ${postDate.getDate()}
                      </p>`;
      postHTML += `</div>`;
      postHTML += `<div class="heads-container">`;
      postHTML += `<h3 class="title">${post.title}</h3>`;
      postHTML += `<i class="author">A post by ${post.author}</i>`;
      postHTML += `</div>`;
      postHTML += `<div class="txt-container">`;
      postHTML += `<p class="post-txt">${post.content}</p>`;
      postHTML += `<a href="post.html?id=${post._id}" id="${post._id}"><button type="button">Read more</button></a>`;
      postHTML += `</div>`;
      postHTML += `<div class="tags-container">`;
      postHTML += `<b class="tags">Tags: ${post.tags.join(', ')}</b>`;
      postHTML += `</div>`;
      postHTML += `</div>`;
    }
    postContainer.innerHTML = postHTML;
  } catch (error) {
    throw new Error(error);
  }
}
