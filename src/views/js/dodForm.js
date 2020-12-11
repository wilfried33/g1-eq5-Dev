const FormADod = document.querySelector('#FormADod');
const showFormADod = document.querySelector('#showFormADod');
const rejectFormADod = document.querySelector('#rejectFormADod');

showFormADod.addEventListener('click', function(){
    FormADod.style.display = 'block';
});

rejectFormADod.addEventListener('click', function(){
    FormADod.style.display = 'none';
});

const FormUDod = document.querySelector('#FormUDod');
const rejectFormUDod = document.querySelector('#rejectFormUDod');
const validFormUDod = document.querySelector('#validFormUDod');

rejectFormUDod.addEventListener('click', function(){
    FormUDod.style.display = 'none';
});

validFormUDod.addEventListener('click', function(){
    updateDod();
});

function showPopupUDod(elementId){
    FormUDod.style.display = 'block';
    const Dod = document.querySelector('#DOD'+elementId);
    FormUDod.querySelector('#_IDDod').value = elementId;
    FormUDod.querySelector('#TIDod').value = Dod.querySelector('#TI'+elementId).innerHTML;
    FormUDod.querySelector('#RUDod').value = HTMLtoRules(Dod.querySelector('#RU'+elementId).innerHTML);
}

function HTMLtoRules(text){
    text = text.replace(/<br>/g, '\n');
    text = text.replace(/- /g, '');
    
    return text;
}

function RulesToHTML(text){
    return '- '+text.replace(/\n/g, '<br>- ');
}

function updateDod(){
    const elementId = FormUDod.querySelector('#_IDDod').value;
    const name = FormUDod.querySelector('#TIDod').value;
    let rules = FormUDod.querySelector('#RUDod').value;

    FormUDod.style.display = 'none';

    fetch('/dod/update', {
        method: 'PUT',
        body: new URLSearchParams({
            _id:elementId,
            name:name,
            rules:rules,
        })
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid')){
                const Dod = document.querySelector('#DOD'+elementId);
                Dod.querySelector('#TI'+elementId).innerHTML = name;
                Dod.querySelector('#RU'+elementId).innerHTML = RulesToHTML(rules);
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
