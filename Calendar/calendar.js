document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    let currentDate = new Date();

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const renderCalendar = async (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay()); // Set to the start of the week (Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)

        calendarContainer.innerHTML = ''; // Clear the current calendar

        // Fetch availability data from the server
        let availabilityData = [];
        try {
            const response = await fetch('http://tuservidor.com/get-availability');
            if (response.ok) {
                availabilityData = await response.json();
            }
        } catch (error) {
            console.error('Error fetching availability data:', error);
        }

        const isToday = (date) => {
            const today = new Date();
            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        };

        // Create the calendar header
        const header = document.createElement('div');
        header.className = 'calendar-header';
        const monthYear = document.createElement('div');
        monthYear.textContent = `${months[startOfWeek.getMonth()]} ${startOfWeek.getFullYear()}`;
        header.appendChild(monthYear);
        calendarContainer.appendChild(header);

        // Create the days of the week row
        const daysRow = document.createElement('div');
        daysRow.className = 'calendar-days-row';
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            daysRow.appendChild(dayElement);
        });
        calendarContainer.appendChild(daysRow);

        // Create the week row
        const weekRow = document.createElement('div');
        weekRow.className = 'calendar-week-row';
        for (let i = 0; i < 7; i++) {
            const dayDate = new Date(startOfWeek);
            dayDate.setDate(startOfWeek.getDate() + i);
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-date';
            if (isToday(dayDate)) {
                dayElement.classList.add('today');
            }

            // Check availability for this date
            const dayAvailability = availabilityData.find(d => new Date(d.date).toDateString() === dayDate.toDateString());
            if (dayAvailability) {
                dayElement.classList.add(dayAvailability.status === 'occupied' ? 'occupied' : 'free');
            }

            dayElement.textContent = dayDate.getDate();
            weekRow.appendChild(dayElement);
        }
        calendarContainer.appendChild(weekRow);
    };

    prevWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        renderCalendar(currentDate);
    });

    nextWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate); // Initial render
});

