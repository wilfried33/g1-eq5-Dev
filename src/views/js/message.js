const message = document.querySelector('#message');

function updateMessage(json){
    let text;
    if (Object.prototype.hasOwnProperty.call(json, 'error'))
        text = '<div class="error">'+json.error+'</div>';
    if (Object.prototype.hasOwnProperty.call(json, 'valid'))
        text = '<div class="valid">'+json.valid+'</div>';
    message.innerHTML = text;
}
