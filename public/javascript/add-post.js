// NewformHandler will run on submit of create-post-button and redirect to /create-post route

function newFormHandler() {
  document.location.replace('/create-post');
}

document.getElementById('add-post-btn').addEventListener('click', newFormHandler);