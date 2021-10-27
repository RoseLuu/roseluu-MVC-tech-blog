const postId= document.querySelector('input[name="post-id"]').value;

const editFormHandler = async function(event){
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content =document.querySelector('textarea[name="content"]').value;

    const response= await fetch(`/api/posts`, {
        method:'PUT',
        body: JSON.stringify({
            title,
            content
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    });
    if(response.ok) {
        document.location.replace('/dashboard');
    } else {
     alert(response.statusText);
    }
};
const deleteHandler =async () =>{
 await fetch(`/api/post/${postId}`, {
     method:'DELETE'
 });
 document.location.replace('/dashboard')
};

document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteHandler);