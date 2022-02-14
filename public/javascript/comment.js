
async function commentFormHandler (event){
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment_text"]').value.trim();

    if(comment_text){
        const response = await fetch('/api/comments', {
            method: 'POST',
            body:JSON.stringify({
                comment_text
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });

        console.log(comment_text);
        if(response.ok){
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#commentForm').addEventListener('submit', commentFormHandler);