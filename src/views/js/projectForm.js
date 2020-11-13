const popupForm = document.querySelector("#popupForm")
const rejectForm = document.querySelector("#rejectForm")

rejectForm.addEventListener("click", function(event){ 
    popupForm.style.display = "none"
})

function showPopup(id, key, name){
    popupForm.style.display = "block";
    popupForm.querySelector("#id").value = id;
    popupForm.querySelector("#key").value = key;
    popupForm.querySelector("#name").value = name;
}