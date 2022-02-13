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

    const id = document.querySelector('#uId').innerHTML;

    const response = await fetch(`/api/users/${id}`, {
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


document.querySelector('#profileEdit').addEventListener('submit', editInfoHandler);