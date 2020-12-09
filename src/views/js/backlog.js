function generateSprintStat(elementId, startDate, endDate, taskCount, velocity, average){
    const progress = document.querySelector('#PROG'+elementId);
    const info = document.querySelector('#INFO'+elementId);
    progress.style.width = ((velocity/taskCount)*100).toString() + '%' 
    const limit = average*0.15;

    const currentDate = Date.parse(new Date());
    const start = Date.parse(new Date(startDate));
    const end = Date.parse(new Date(endDate));
    if(currentDate > end){
        info.innerHTML = "Terminer"
        return;
    }
    if(currentDate > start){
        info.innerHTML = "En cours"
        return;
    }

    if(taskCount > average + limit){
        info.innerHTML = '<div class="text.danger"><i class="fas fa-exclamation-triangle "></i> Tâche élevé</div>'
    }
}