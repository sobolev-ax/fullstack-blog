const card = post => {
    return `<div class="card z-depth-4">
                <div class="card-content">
                    <span class="card-title">
                        ${post.title}
                    </span>
                    <p>
                        ${post.text}
                    </p>
                    <time datetime="${post.date}">
                        ${post.date}
                    </time>
                </div>
                <div class="card-action">
                    <button class="btn btn-small red">
                        <i class="material-icons">
                            delete
                        </i>
                    </button>
                </div>
            </div>`
}

const BASE_URL = 'api/post';
let posts = [];

class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(res => res.json());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backednPosts => {
        posts = backednPosts.concat();

        renderPosts(posts);
    })
})

function renderPosts(_posts = []) {
    const $posts = document.querySelector('#posts');
    let html = `<h1 class="center">Posts</h1>`;

    if (_posts.length) {
        html += _posts.map(post => card(post)).join(' ');
    } else {
        html += `<h2 class="center">...no posts...</h2>`
    }

    $posts.innerHTML = html;
}
