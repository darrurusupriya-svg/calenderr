// Logic for manipulating the events array
function addEvent(date, title) {
    const events = getEvents();
    events.push({ id: Date.now(), date, title });
    saveEvents(events);
}

function updateEvent(id, newTitle) {
    const events = getEvents();
    const event = events.find(e => e.id === id);
    if (event) event.title = newTitle;
    saveEvents(events);
}

function deleteEvent(id) {
    const events = getEvents().filter(e => e.id !== id);
    saveEvents(events);
}
