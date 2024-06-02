document.addEventListener('DOMContentLoaded', () => {
    const calendarContainer = document.getElementById('calendar-container');
    const prevWeekButton = document.getElementById('prev-week-button');
    const nextWeekButton = document.getElementById('next-week-button');

    const renderCalendar = async (startDate) => {
        calendarContainer.innerHTML = ''; // Limpia el contenedor

        const currentWeek = getWeek(startDate);

        for (const day of currentWeek) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.textContent = `${day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`;

            if (isToday(day)) {
                dayElement.classList.add('today');
            }

            const reservations = await ReservationRepository.getReservations();
            const dayReservations = reservations.filter(reservation => reservation.date === day.toISOString().split('T')[0]);

            if (dayReservations.length > 0) {
                dayElement.classList.add('reserved');
            }

            calendarContainer.appendChild(dayElement);
        }
    };

    const getWeek = (startDate) => {
        const start = new Date(startDate);
        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const prevWeek = () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        renderCalendar(startDate);
    };

    const nextWeek = () => {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 7);
        renderCalendar(startDate);
    };

    prevWeekButton.addEventListener('click', prevWeek);
    nextWeekButton.addEventListener('click', nextWeek);

    // Inicializa el calendario con la semana actual
    const today = new Date();
    renderCalendar(today);
});

