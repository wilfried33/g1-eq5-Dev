const FormNS = document.querySelector('#FormNS');
const showFormNS = document.querySelector('#showFormNS');
const rejectFormNS = document.querySelector('#rejectFormNS');

showFormNS.addEventListener('click', function(){
    FormNS.style.display = 'block';
});

rejectFormNS.addEventListener('click', function(){
    FormNS.style.display = 'none';
});

const FormSprint = document.querySelector('#FormSprint');
const rejectFormSprint = document.querySelector('#rejectFormSprint');
const validFormSprint = document.querySelector('#validFormSprint');

rejectFormSprint.addEventListener('click', function(){
    FormSprint.style.display = 'none';
});

validFormSprint.addEventListener('click', function(){
    updateSprint();
});

function showPopupSprint(elementId){
    FormSprint.style.display = 'block';
    const Sprint = document.querySelector('#Sprint'+elementId);
    FormSprint.querySelector('#_IDSprint').value = elementId;
    FormSprint.querySelector('#TISprint').value = Sprint.querySelector('#TI'+elementId).innerHTML;
}

function updateSprint(){
    const elementId = FormSprint.querySelector('#_IDSprint').value;
    const name = FormSprint.querySelector('#TISprint').value;

    FormSprint.style.display = 'none';

    fetch('/backlog/sprint/update', {
        method: 'PUT',
        body: new URLSearchParams({
            _id:elementId,
            name:name
        })
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if(Object.prototype.hasOwnProperty.call(json, 'valid')){
                const Sprint = document.querySelector('#Sprint'+elementId);
                Sprint.querySelector('#TI'+elementId).innerHTML = name;
            }
        })
        .catch(err => console.log(err));
}
