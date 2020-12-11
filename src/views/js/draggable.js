function dragOver(ev) {
    ev.preventDefault();
}

function dragOn(ev) {
    this.style.opacity = '0.4';
    ev.dataTransfer.setData('text', this.id);
}

function dragOff(){
    this.style.opacity = '1';
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData('text');
    
    const dropElement = this;
    const first = dropElement.querySelector('.dropURL').value;
    const second = document.querySelector('#'+data).querySelector('.dragURL').value;

    fetch(first+second, {
        method: 'PUT'
    })
        .then(response => response.json())
        .then(json => {
            updateMessage(json);
            if (Object.prototype.hasOwnProperty.call(json, 'valid'))
                window.location.reload();
                //dropElement.appendChild(document.getElementById(data));
        })
        .catch(err => console.log(err));

}

let dragItems = document.querySelectorAll('.draggable');
dragItems.forEach(function(item) {
    item.addEventListener('dragstart', dragOn, false);
    item.addEventListener('dragend', dragOff, false);
});

let dropItems = document.querySelectorAll('.draggable_drop');
dropItems.forEach(function(item) {
    item.addEventListener('dragover', dragOver, false);
    item.addEventListener('drop', drop, false);
});
