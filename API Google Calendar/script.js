let CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
let API_KEY = 'YOUR_API_KEY';
let DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
let SCOPES = "https://www.googleapis.com/auth/calendar";

let authorizeButton = document.getElementById('authorize_button');
let signoutButton = document.getElementById('signout_button');

const vehicles = [
    { id: 1, name: 'Vehículo 1' },
    { id: 2, name: 'Vehículo 2' },
    { id: 3, name: 'Vehículo 3' }
];

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        initCalendar();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function initCalendar() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        events: function (start, end, timezone, callback) {
            gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': start.toISOString(),
                'timeMax': end.toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'orderBy': 'startTime'
            }).then((response) => {
                let events = response.result.items;
                let calendarEvents = events.map(event => ({
                    title: event.summary,
                    start: event.start.dateTime || event.start.date,
                    end: event.end.dateTime || event.end.date
                }));
                callback(calendarEvents);
            });
        },
        select: function (start, end) {
            let availableVehicles = getAvailableVehicles(start, end);
            if (availableVehicles.length > 0) {
                let vehicleType = prompt('Seleccione el tipo de vehículo:\n' + availableVehicles.map(v => v.name).join('\n'));
                if (vehicleType) {
                    let selectedVehicle = availableVehicles.find(v => v.name === vehicleType);
                    if (selectedVehicle) {
                        let eventData = {
                            title: 'Reserva de Vehículo: ' + vehicleType,
                            start: start.startOf('day').format(),
                            end: end.startOf('day').format()
                        };
                        createEvent(selectedVehicle.id, vehicleType, eventData.start, eventData.end);
                        $('#calendar').fullCalendar('renderEvent', eventData, true);
                    } else {
                        alert('Vehículo no encontrado.');
                    }
                }
            } else {
                alert('No hay vehículos disponibles en la fecha seleccionada.');
            }
            $('#calendar').fullCalendar('unselect');
        }
    });
}

function getAvailableVehicles(start, end) {
    let unavailableVehicles = [];
    return new Promise((resolve) => {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': start.toISOString(),
            'timeMax': end.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        }).then((response) => {
            let events = response.result.items;
            events.forEach(event => {
                if (event.summary.includes('Reserva de Vehículo:')) {
                    let vehicleName = event.summary.split(': ')[1];
                    let vehicle = vehicles.find(v => v.name === vehicleName);
                    if (vehicle) {
                        unavailableVehicles.push(vehicle.id);
                    }
                }
            });
            resolve(vehicles.filter(v => !unavailableVehicles.includes(v.id)));
        });
    });
}

function createEvent(vehicleId, vehicleType, startTime, endTime) {
    var event = {
        'summary': 'Reserva de Vehículo: ' + vehicleType,
        'start': {
            'date': startTime
        },
        'end': {
            'date': endTime
        },
    };

    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });

    request.execute(function (event) {
        console.log('Event created: ' + event.htmlLink);
    });
}

document.addEventListener("DOMContentLoaded", handleClientLoad);

