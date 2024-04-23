document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var eventTitleInput = document.getElementById('event-title');
    var eventStartInput = document.getElementById('event-start');
    var eventDurationInput = document.getElementById('event-duration');
    var eventListEl = document.getElementById('event-list');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        select: function (arg) {
            eventStartInput.value = arg.startStr;
        },
        eventRender: function (info) {
            info.el.addEventListener('click', function () {
                alert('Evento: ' + info.event.title);
            });
        },
        events: [
            // Aquí puedes cargar eventos preexistentes desde una fuente de datos
            // Por ejemplo, desde un servidor o almacenamiento local
        ]
    });
    calendar.render();

    window.addEvent = function () {
        var title = eventTitleInput.value;
        var start = eventStartInput.value;
        var duration = parseInt(eventDurationInput.value, 10); // Convertir a entero
        if (title && start && !isNaN(duration) && duration > 0) {
            var end = new Date(new Date(start).getTime() + duration * 60 * 60 * 1000); // Calcular la fecha de finalización
            calendar.addEvent({ title: title, start: start, end: end });
            eventTitleInput.value = '';
            eventStartInput.value = '';
            eventDurationInput.value = '1'; // Restaurar el valor predeterminado de duración
            updateEventList(calendar.getEvents());
        } else {
            alert('Por favor, introduce un título, una fecha de inicio válida y una duración válida (en horas).');
        }
    };

    function updateEventList(events) {
        eventListEl.innerHTML = '';
        var currentTime = new Date().getTime();
        events.sort(function (a, b) {
            return a.start.getTime() - b.start.getTime();
        });
        events.forEach(function (event, index) {
            // Calcular huecos libres
            if (index < events.length - 1) {
                var nextEvent = events[index + 1];
                var gap = (nextEvent.start.getTime() - event.end.getTime()) / (60 * 60 * 1000); // Convertir de milisegundos a horas
                if (gap > 0) {
                    var gapInfo = document.createElement('div');
                    gapInfo.textContent = 'Espacio libre: ' + gap + ' horas';
                    eventListEl.appendChild(gapInfo);
                }
            }

            // Mostrar evento
            var eventInfo = document.createElement('div');
            eventInfo.textContent = event.title + ' - ' + event.start.toLocaleString() + ' - ' + event.end.toLocaleString();
            var duration = (event.end.getTime() - event.start.getTime()) / (60 * 60 * 1000); // Duración del evento en horas
            if (duration >= 1) {
                eventInfo.classList.add('busy-date'); // Asignar la clase para fechas ocupadas
            } else {
                eventInfo.classList.add('free-date'); // Asignar la clase para fechas libres
            }
            eventListEl.appendChild(eventInfo);
        });
    }

});



