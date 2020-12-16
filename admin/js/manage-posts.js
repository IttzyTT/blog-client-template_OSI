let table = document.getElementById('table-manage-posts');
let body = document.getElementsByTagName('body')[0];

loadPosts();

async function loadPosts() {
  try {
    let postsResponse = await fetch('http://localhost:3000/posts');
    let postsData = await postsResponse.json();

    let dynTableContent = '';

    for (let post of postsData.reverse()) {
      let postDate = new Date(post.date);
      dynTableContent += `<tr class="align-middle" id="table-row-${post._id}">
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${post.tags.join(', ')}</td>
                <td>
                    <div class="admin-table-dates">
                        <span>${postDate.toLocaleDateString([], {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}</span>
                        <span class="admin-table-time"><i>${postDate.toLocaleTimeString(
                          [],
                          { hour: '2-digit', minute: '2-digit' }
                        )}</i></span>
                    </div>
                </td>
                <td>
                    <a href="./update-post.html?id=${post._id}">
                        <button type="button" class="update-post-btn">Update post <i class="fas fa-pencil-alt"></i></button>
                    </a>
                    <button type="button" class="delete-btn" data-post-id="${
                      post._id
                    }">Delete post <i class="fas fa-trash-alt"></i></button>
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
  let deletePopup = document.getElementById('delete-are-you-sure');

  try {
    let deleteBtns = document.querySelectorAll('.delete-btn');
    let currentId = '';

    for (let btn of deleteBtns) {
      btn.addEventListener('click', function () {
        currentId = this.dataset.postId;
        deletePopup.style.animationName = 'popup-appear';
        deletePopup.style.display = 'block';
      });
    }
    let confirmDeleteBtn = document.getElementById('admin-confirm-delete-btn');
    let cancelDeleteBtn = document.getElementById('admin-cancel-delete-btn');

    confirmDeleteBtn.addEventListener('click', async function () {
      await fetch(`http://localhost:3000/posts/${currentId}`, {
        method: 'DELETE',
      });
      let currentTableRow = document.getElementById(`table-row-${currentId}`);
      currentTableRow.remove();
      fadeOutEffect();
    });

    cancelDeleteBtn.addEventListener('click', async function () {
      fadeOutEffect();
    });
  } catch (error) {
    throw new Error(error);
  }

  async function fadeOutEffect() {
    deletePopup.style.animationName = 'popup-disappear';
    let animationDuration = getComputedStyle(deletePopup).animationDuration;
    animationDuration = parseFloat(animationDuration);
    animationDuration *= 1000;

    await wait(animationDuration);
    deletePopup.style.display = 'none';
  }

  async function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
