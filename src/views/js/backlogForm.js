const popupFormUS = document.querySelector("#popupFormUS")
const popupFormNS = document.querySelector("#popupFormNS")
const showFormNS = document.querySelector("#showFormNS")
const rejectFormUS = document.querySelector("#rejectFormUS")
const rejectFormNS = document.querySelector("#rejectFormNS")

showFormNS.addEventListener("click", function(event){
    popupFormNS.style.display = "block";
})

rejectFormNS.addEventListener("click", function(event){
    popupFormNS.style.display = "none"
})

rejectFormUS.addEventListener("click", function(event){ 
    popupFormUS.style.display = "none"
})

function showPopupUS(_id, id, name, description, difficulty, priority){
    popupFormUS.style.display = "block";
    popupFormUS.querySelector("#_idUS").value = _id;
    popupFormUS.querySelector("#idUS").value = id;
    popupFormUS.querySelector("#nameUS").value = name;
    popupFormUS.querySelector("#descriptionUS").value = description;
    popupFormUS.querySelector("#difficultyUS").value = difficulty;
    popupFormUS.querySelector("#priorityUS").value = priority;
}