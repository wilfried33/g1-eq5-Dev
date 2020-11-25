const Form = document.querySelector('#Form');
const rejectForm = document.querySelector('#rejectForm');
const validForm = document.querySelector('#validForm');

rejectForm.addEventListener('click', function(event){ 
    Form.style.display = 'none';
});

validForm.addEventListener('click', function(event){
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

    const url = '/projects/update?id='+elementId+'&name='+name;
    console.log(url);

    Form.style.display = 'none';

    fetch(url, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if(json.hasOwnProperty('valid')){
                const project = document.querySelector('#PR'+elementId);
                project.querySelector('#TI'+elementId).innerHTML = name;
            }
        })
        .catch(err => console.log(err));
}