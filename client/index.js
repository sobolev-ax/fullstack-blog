const card = post => {
    return `<div class="card z-depth-4">
                <div class="card-content">
                    <span class="card-title">
                        ${post.title}
                    </span>
                    <p style="white-space: pre-line">
                        ${post.text}
                    </p>
                    <time datetime="${post.date}">
                        ${post.date}
                    </time>
                </div>
                <div class="card-action">
                    <button class="btn btn-small red" data-remove="${post._id}">
                        <i class="material-icons">
                            delete
                        </i>
                    </button>
                </div>
            </div>`
}

const BASE_URL = 'api/post';
let posts = [];
let modal;
const modalId = '#createPostModal';

class PostApi {
    static fetch() {
        return fetch(BASE_URL, {method: 'get'}).then(res => res.json());
    }
    static create(post) {
        return fetch(BASE_URL, {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }
    static remove(id) {
        return fetch(`${BASE_URL}/${id}`, {
            method: 'delete'
        }).then(res => res.json())
    }
}

document.addEventListener('DOMContentLoaded', () => {
    PostApi.fetch().then(backednPosts => {
        posts = backednPosts.concat();

        renderPosts(posts);
    })

    modal = M.Modal.init(document.querySelector(modalId));
})

document.addEventListener('click', (e) => {
    const $node = e.target;
    if ($node.hasAttribute('id') && $node.getAttribute('id') ===  'createPost') {
        onCreatePost();
    }
    if ($node.hasAttribute('data-remove') ||
        $node.parentElement.hasAttribute('data-remove')) {
        onDeletePost(e);
    }
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

function onCreatePost() {
    const $title = document.querySelector('#title');
    const $text = document.querySelector('#text');

    if (!$title.value && !$text.value) return;
    const newPost = {
        'title': $title.value,
        'text': $text.value
    }

    PostApi.create(newPost).then(post => {
        posts.push(post);
        renderPosts(posts);

        modal.close();
        $title.value = '';
        $text.value = '';

        M.updateTextFields();
    })
}

function onDeletePost(e) {
    const decision = confirm('Are you really delete this post?');
    
    if (!decision) return;

    const id = e.target.getAttribute('data-remove') ||
               e.target.parentElement.getAttribute('data-remove');

    PostApi.remove(id).then(() => {
        const postIndex = posts.findIndex(post => post._id === id);
        posts.splice(postIndex, 1);
        renderPosts(posts);
    })
}
