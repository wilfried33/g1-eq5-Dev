const message = document.querySelector('#message');

function updateMessage(json){
    let text;
    if(json.hasOwnProperty('error'))
        text = '<div class="error">'+json.error+'</div>';
    if(json.hasOwnProperty('valid'))
        text = '<div class="valid">'+json.valid+'</div>';
    message.innerHTML = text;
}