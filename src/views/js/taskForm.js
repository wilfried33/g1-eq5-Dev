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
    const task = document.querySelector('#TASK'+elementId);
    Form.querySelector('#_id').value = elementId;
    Form.querySelector('#id').value = task.querySelector('#ID'+elementId).innerHTML;
    Form.querySelector('#name').value = task.querySelector('#NA'+elementId).innerHTML;
    Form.querySelector('#description').value = task.querySelector('#DE'+elementId).innerHTML;
    Form.querySelector('#timeEstimation').value = task.querySelector('#TI'+elementId).innerHTML;
    Form.querySelector('#userStory').value = task.querySelector('#US'+elementId).innerHTML;
    Form.querySelector('#dependencies').value = task.querySelector('#TA'+elementId).innerHTML;
}

function updateDeveloper(elementId){
    const task = document.querySelector('#TASK'+elementId);
    const developer = task.querySelector('#developer').value;
    if(developer === -1)
        developer=null;

    fetch('/task/update/developer', {
        method: 'PUT',
        body: new URLSearchParams({
            _id:elementId,
            developer:developer
        })
    })
    .then(response => response.json())
    .then(json => {
        updateMessage(json);
    })
    .catch(err => console.log(err));
}

function updateURL(){
    const elementId = Form.querySelector('#_id').value;
    const name = Form.querySelector('#name').value;
    const description = Form.querySelector('#description').value;
    const userStory = Form.querySelector('#userStory').value;
    const time = Form.querySelector('#timeEstimation').value;
    const dependencies = Form.querySelector('#dependencies').value;
    
    Form.style.display = 'none';

    fetch('/task/update', {
        method: 'PUT',
        body: new URLSearchParams({
            _id:elementId,
            name:name,
            description:description,
            userStory:userStory,
            timeEstimation:time,
            dependencies:dependencies
        })
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid')){
                const task = document.querySelector('#TASK'+elementId);
                task.querySelector('#NA'+elementId).innerHTML = name;
                task.querySelector('#DE'+elementId).innerHTML = description;
                task.querySelector('#TI'+elementId).innerHTML = time;
                task.querySelector('#US'+elementId).innerHTML = userStory;
                task.querySelector('#TA'+elementId).innerHTML = dependencies;
            }
        })
        .catch(err => console.log(err));
}

function deleteURL(elementId, url) {
    fetch(url, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid')){
                document.querySelector('#'+elementId).remove();
            }
        })
        .catch(err => console.log(err));
}