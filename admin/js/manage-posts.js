let table = document.getElementById("table-manage-posts");
let allTags = [];

loadPosts();

async function loadPosts() {
  try {
    let postsResponse = await fetch('http://localhost:3000/posts');
    let postsData = await postsResponse.json();

    let dynTableContent = '';

        for (let post of postsData.reverse()) {
            allTags.push(...post.tags);

            let postDate = new Date(post.date);
            dynTableContent +=
            `<tr class="align-middle" id="table-row-${post._id}">
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
                        <button type="button" class="update-post-btn btn-bright-template">Update post <i class="fas fa-pencil-alt"></i></button>
                    </a>
                    <button type="button" class="delete-btn btn-bright-template" data-post-id="${post._id}">Delete post <i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`;
        }
        table.innerHTML += dynTableContent;
        deletePostBtn(); 
        tagTrends();

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

async function tagTrends() {
    console.log(allTags);
    const trendsBtn = document.getElementById("trends-btn");
    const trendContainer = document.getElementById("trend-container");
    const trendsDynContent = document.getElementById("tag-trends");
    let uniqueTags = new Set(allTags);
    let tagStats = {};
    let tagsTotal = 0;
    let highestNumber = 0;

    //  Get the stats
    for (let tag of uniqueTags) {
        let tagCounter = allTags.filter(value => value === tag).length;
        tagStats[tag] = tagCounter;
        tagsTotal += tagCounter;
    }
    console.log(tagsTotal);
    console.log(tagStats);

    let percentageArray = [];
    //  tag percentage of total tags
    for (let prop in tagStats) {
        tagStats[prop] /= tagsTotal;
        tagStats[prop] = tagStats[prop] * 100;
        console.log(prop + " " + tagStats[prop]);
        percentageArray.push(tagStats[prop]);
    }

    highestNumber = Math.max(...percentageArray);
    
    let trendHTML = `
                <p><b>Tags</b><i> - what do you write about the most?</i></p>
                <div id="tag-trends-dyn-container">
            `;
    for (let prop in tagStats) {
        trendHTML += 
            `
            <span style="display:inline-block; background-color: whitesmoke; 
            filter: opacity(calc(${tagStats[prop]}/${highestNumber})); 
            border: 1px solid black; width: ${tagStats[prop]}%; height: min-content;">
            ${prop}
            </span>
            `;
    }
    trendHTML += `</div>`;
    trendsDynContent.insertAdjacentHTML("afterbegin", trendHTML);

    $(trendsBtn).hover(() => {
        $(trendsBtn).animate({paddingTop: "6px"}, 200);
    }, () => {
        $(trendsBtn).animate({paddingTop: "3px"}, 200);
    });

    trendsBtn.addEventListener("click", function() {
        $(trendsDynContent).slideToggle("slow", "linear");
        console.log(this.innerHTML);
        this.innerHTML = trendsBtnInnerText(this);
    });
    function trendsBtnInnerText(key) {
        switch (key.innerHTML) {
            case `<i class="fas fa-chart-line"></i> Show Trends`:
                return `<i class="fas fa-chart-line"></i> Close Trends`;
            case `<i class="fas fa-chart-line"></i> Close Trends`:
                return `<i class="fas fa-chart-line"></i> Show Trends`;
            default:
                return;
        }
    }
    trendsDynContent.style.width = contentWidth() + "px";
}

function contentWidth() {
    const content = document.querySelectorAll(".center-block-element")[0];
    const contentStyling = getComputedStyle(content);
    const totalWidth = parseInt(contentStyling.getPropertyValue("width"));
    const paddingLeft = parseInt(contentStyling.getPropertyValue("padding-left"));
    const netWidth = totalWidth - (paddingLeft * 2);
    return netWidth;
}