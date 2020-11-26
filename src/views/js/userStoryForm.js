const FormUS = document.querySelector('#FormUS');
const rejectFormUS = document.querySelector('#rejectFormUS');
const validFormUS = document.querySelector('#validFormUS');

rejectFormUS.addEventListener('click', function(){
    FormUS.style.display = 'none';
});

validFormUS.addEventListener('click', function(){
    updateUS();
});

function showPopupUS(elementId){
    FormUS.style.display = 'block';
    const US = document.querySelector('#US'+elementId);
    FormUS.querySelector('#_IDUS').value = elementId;
    FormUS.querySelector('#IDUS').value = US.querySelector('#ID'+elementId).innerHTML;
    FormUS.querySelector('#TIUS').value = US.querySelector('#TI'+elementId).innerHTML;
    FormUS.querySelector('#DEUS').value = US.querySelector('#DE'+elementId).innerHTML;
    FormUS.querySelector('#DIUS').value = US.querySelector('#DI'+elementId).innerHTML;
    FormUS.querySelector('#PRUS').value = US.querySelector('#PR'+elementId).innerHTML;
}

function updateUS(){
    const elementId = FormUS.querySelector('#_IDUS').value;

    const name = FormUS.querySelector('#TIUS').value;
    const description = FormUS.querySelector('#DEUS').value;
    const difficulty = FormUS.querySelector('#DIUS').value;
    const priority = FormUS.querySelector('#PRUS').value;

    const url = '/backlog/update?_id='+elementId+'&name='+name+'&description='+description+'&difficulty='+difficulty+'&priority='+priority;
    console.log(url);
    FormUS.style.display = 'none';

    fetch(url, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid')){
                const US = document.querySelector('#US'+elementId);
                US.querySelector('#TI'+elementId).innerHTML = name;
                US.querySelector('#DE'+elementId).innerHTML = description;
                US.querySelector('#DI'+elementId).innerHTML = difficulty;
                US.querySelector('#PR'+elementId).innerHTML = priority;
            }
        })
        .catch(err => console.log(err));
}

// eslint-disable-next-line no-unused-vars
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
