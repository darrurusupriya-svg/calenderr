// Handles saving and loading data from the browser
function getEvents() {
    const data = localStorage.getItem('calendarEvents');
    return data ? JSON.parse(data) : [];
}

function saveEvents(events) {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
}
