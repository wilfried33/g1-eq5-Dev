function dragOver(ev) {
    ev.preventDefault();
}

function dragOn(ev) {
    this.style.opacity = '0.4';
    ev.dataTransfer.setData("text", this.id);
}

function dragOff(ev){
    this.style.opacity = '1';
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log(data)
    const dropElement = this;
    const first = dropElement.querySelector(".dropURL").value;
    const second = document.querySelector('#'+data).querySelector('.dragURL').value;

    fetch(first+second, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(json => {
        updateMessage(json)
        if(json.hasOwnProperty('valid'))
            dropElement.appendChild(document.getElementById(data));
    })
    .catch(err => console.log(err))

}

let drag_items = document.querySelectorAll('.draggable');
drag_items.forEach(function(item) {
    item.addEventListener('dragstart', dragOn, false);
    item.addEventListener('dragend', dragOff, false);
});

let drop_items = document.querySelectorAll('.draggable_drop');
drop_items.forEach(function(item) {
    item.addEventListener('dragover', dragOver, false);
    item.addEventListener('drop', drop, false);
});