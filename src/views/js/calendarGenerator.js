const monthName = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
];

function generateCalendar(id, year, month, startDate, endDate){
    const calendar = document.querySelector('#'+id);
    if(calendar === null)
        return;

    const start = new Date(startDate);
    start.setHours(0);
    const end = new Date(endDate);
    end.setHours(0);

    const currentDateMonth = new Date(year, month, 1);
    const previousDateMonth = new Date(currentDateMonth);
    previousDateMonth.setMonth(previousDateMonth.getMonth() - 1);
    const nextDateMonth = new Date(currentDateMonth);
    nextDateMonth.setMonth(nextDateMonth.getMonth() + 1);

    let text = '<div class="calendar-month center">';
    text += '<button class="button" onclick="generateCalendar(\''+id+'\','+previousDateMonth.getFullYear()+','+previousDateMonth.getMonth()+',\''+startDate+'\',\''+endDate+'\')"><i class="fas fa-caret-left"></i></button>';
    text += '<div class="flex-grow-1"><div>'+monthName[month]+'</div><div>'+year+'</div></div>';
    text += '<button class="button" onclick="generateCalendar(\''+id+'\','+nextDateMonth.getFullYear()+','+nextDateMonth.getMonth()+',\''+startDate+'\',\''+endDate+'\')"><i class="fas fa-caret-right"></i></button></div>';
    text += `<div class="calendar-date center" >
            <div class="calendar-day">L</div>
            <div class="calendar-day">M</div>
            <div class="calendar-day">M</div>
            <div class="calendar-day">J</div>
            <div class="calendar-day">V</div>
            <div class="calendar-day">S</div>
            <div class="calendar-day">D</div>`;


    const day = (currentDateMonth.getDay()+6)%7;
    for(let index = 0; index < day; index++){
        text += '<div class="calendar-number"></div>';
    }

    const startParse = Date.parse(start);
    const endParse = Date.parse(end);

    let inside = (dateIsInside(currentDateMonth, start, end))?true:false;
    while(currentDateMonth.getMonth() === month){
        const date = currentDateMonth.getDate();
        text += '<div class="calendar-number ';
        if(Date.parse(currentDateMonth) === startParse){
            text += ' start';
            inside = true;
        }else if(Date.parse(currentDateMonth) === endParse){
            text += ' end';
            inside = false;
        }else if(inside){
            text += 'current ';
        }
        text += '">'+date+'</div>';
        currentDateMonth.setDate(date + 1);
    }
    text += '</div>';
    calendar.innerHTML = text;
}

function dateIsInside(date, start, end){
    const dateParse = Date.parse(date);
    const startParse = Date.parse(start);
    const endParse = Date.parse(end);

    return startParse <= dateParse && dateParse <= endParse;
}
