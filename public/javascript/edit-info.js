function sameUser(){
    const username = document.querySelector('.subtitle').innerHTML;
    const loggedInUser = document.querySelector('#Username').innerHTML;
    const editBtn = document.getElementById("editBtn");

    if(username !== loggedInUser){
        editBtn.style.display = 'none';
    };
};

function switchDisplay(){
    const formDisplay = document.getElementById("profileEdit");
    const editBtn = document.getElementById("editBtn");

    if(formDisplay.style.display === 'none'){
        formDisplay.style.display = "block"
    };

    if(editBtn.style.display !== "none"){
        editBtn.style.display = 'none'
    };
};

async function editInfoHandler(event){
    event.preventDefault();

    const info = document.querySelector('#infoText').value.trim();

    const username = document.querySelector('.subtitle').innerHTML;

    const response = await fetch(`/api/users/${username}`, {
        method: 'PUT',
        body: JSON.stringify({
            info,
        }),
        headers:{
            'Content-type' : 'application/json'
        }
    });

    if(response.ok){
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

sameUser();
document.querySelector('#profileEdit').addEventListener('submit', editInfoHandler);