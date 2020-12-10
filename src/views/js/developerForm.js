function sendForm(project){
    const existName = document.querySelector('#existName').value;
    const name = document.querySelector('#name').value;
    const type = document.querySelector('#type').value;

    if (existName === '-1')
        addURL(type, name, project);
    else
        updateURL(type, existName, project);
}

function addURL(type, name, project){
    fetch('/developer/create', {
        method: 'POST',
        body: new URLSearchParams({
            projectId:project,
            type:type,
            username:name
        })
    })
        .then(response => response.json())
        .then(json => {
            if (Object.prototype.hasOwnProperty.call(json, 'error')){
                updateMessage(json);
            }
        })
        .catch(err => console.log(err));
}

function updateURL(type, name, project){

    fetch('/developer/update', {
        method: 'PUT',
        body: new URLSearchParams({
            projectId:project,
            type:type,
            username:name
        })
    })
        .then(response => response.json())
        .then(json => {
            if (Object.prototype.hasOwnProperty.call(json, 'error')){
                updateMessage(json);
            }
        })
        .catch(err => console.log(err));
}
