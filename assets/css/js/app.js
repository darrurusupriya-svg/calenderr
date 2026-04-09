let nav = 0; // Tracks which month we are viewing
let clickedDate = null;
let selectedEventId = null;

const calendar = document.getElementById('calendar');
const modal = document.getElementById('eventModal');
const eventTitleInput = document.getElementById('eventTitleInput');

function loadCalendar() {
    const dt = new Date();
    if (nav !== 0) dt.setMonth(new Date().getMonth() + nav);

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
    });
    const paddingDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
        `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

    calendar.innerHTML = '';
    const events = getEvents();

    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;
            const eventForDay = events.find(e => e.date === dayString);

            if (eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
                
                daySquare.onclick = () => openModal(dayString, eventForDay.id);
            } else {
                daySquare.onclick = () => openModal(dayString);
            }
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);
    }
}

function openModal(date, id = null) {
    clickedDate = date;
    selectedEventId = id;
    const events = getEvents();

    if (id) {
        const event = events.find(e => e.id === id);
        eventTitleInput.value = event.title;
        document.getElementById('deleteButton').style.display = 'block';
        document.getElementById('modalTitle').innerText = 'Edit Event';
    } else {
        eventTitleInput.value = '';
        document.getElementById('deleteButton').style.display = 'none';
        document.getElementById('modalTitle').innerText = 'Add Event';
    }
    modal.style.display = 'block';
}

document.getElementById('saveButton').onclick = () => {
    if (selectedEventId) {
        updateEvent(selectedEventId, eventTitleInput.value);
    } else {
        addEvent(clickedDate, eventTitleInput.value);
    }
    modal.style.display = 'none';
    loadCalendar();
};

document.getElementById('deleteButton').onclick = () => {
    deleteEvent(selectedEventId);
    modal.style.display = 'none';
    loadCalendar();
};

document.getElementById('closeButton').onclick = () => modal.style.display = 'none';
document.getElementById('nextButton').onclick = () => { nav++; loadCalendar(); };
document.getElementById('backButton').onclick = () => { nav--; loadCalendar(); };

loadCalendar();
