const Form = document.querySelector('#Form');
const rejectForm = document.querySelector('#rejectForm');
const validForm = document.querySelector('#validForm');

rejectForm.addEventListener('click', function(){
    Form.style.display = 'none';
});

validForm.addEventListener('click', function(){
    updateURL();
});


function showPopup(elementId){
    Form.style.display = 'block';
    const project = document.querySelector('#PR'+elementId);
    Form.querySelector('#id').value = elementId;
    Form.querySelector('#key').value = project.querySelector('#KEY'+elementId).innerHTML;
    Form.querySelector('#name').value = project.querySelector('#TI'+elementId).innerHTML;
}

function updateURL(){
    const elementId = Form.querySelector('#id').value;
    const name = Form.querySelector('#name').value;
    
    Form.style.display = 'none';

    fetch('/projects/update', {
        method: 'PUT',
        body: new URLSearchParams({
            _id:elementId,
            name:name
        })
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid')){
                const project = document.querySelector('#PR'+elementId);
                project.querySelector('#TI'+elementId).innerHTML = name;
            }
        })
        .catch(err => console.log(err));
}

function selectURL(elementId){
    fetch('/projects/select?projectId='+elementId, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
        })
        .catch(err => console.log(err));
}
