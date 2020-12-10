function sendForm(){
    const existName = document.querySelector('#existName').value;
    const name = document.querySelector('#name').value;
    const type = document.querySelector('#type').value;

    if (existName === '-1')
        addURL(type, name);
    else
        updateURL(type, existName);
}

function updateURL(type, name, project){

    fetch('/developer/update', {
        method: 'PUT',
        body: new URLSearchParams({
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
