const popupForm = document.querySelector("#popupForm")
const rejectForm = document.querySelector("#rejectForm")

rejectForm.addEventListener("click", function(event){ 
    popupForm.style.display = "none"
})

function showPopup(key, name){
    popupForm.style.display = "block";
    popupForm.querySelector("#key").value = key;
    popupForm.querySelector("#name").value = name;
}