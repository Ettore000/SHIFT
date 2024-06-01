/*document.addEventListener('DOMContentLoaded', () => {
    const reservationDateInput = document.getElementById('reservation-date');
    const today = new Date(); // Obtener la fecha actual

    // Convertir la fecha actual a formato ISO (YYYY-MM-DD)
    const minDate = today.toISOString().split('T')[0];

    // Establecer la fecha mínima en el campo de fecha de reserva
    reservationDateInput.min = minDate;

    // Escucha el envío del formulario de reserva
    const reservationForm = document.getElementById('add-reservation-form');
    reservationForm.addEventListener('submit', event => {
        // Obtener la fecha seleccionada por el usuario
        const selectedDate = new Date(reservationDateInput.value);

        // Si la fecha seleccionada es anterior a la fecha actual, prevenir el envío del formulario
        if (selectedDate < today) {
            event.preventDefault();
            alert('Please select a date from today or later.');
        }
    });

    const bikeTypeSelect = document.getElementById('bike-type');
    const bikeModelSelect = document.getElementById('bike-model');

    // Define los modelos de bicicletas correspondientes a cada tipo
    const bikeModels = {
        Electric_Bike: ["Model A", "Model B", "Model C"],
        Scooter: ["Model X", "Model Y", "Model Z"]
    };

    // Función para actualizar las opciones de modelos según el tipo de bicicleta seleccionado y la disponibilidad
    const updateBikeModels = async () => {
        const selectedType = bikeTypeSelect.value;
        const selectedDate = reservationDateInput.value;

        // Limpia las opciones actuales y agrega una opción por defecto
        bikeModelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';

        if (selectedType && bikeModels[selectedType]) {
            // Filtra los modelos disponibles para el tipo de bicicleta seleccionado y la fecha seleccionada
            const availableModels = await fetchAvailableModels(selectedType, selectedDate);

            availableModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                bikeModelSelect.appendChild(option); // Agrega cada modelo como una opción
            });
        }
    };

    // Función para obtener los modelos de bicicletas disponibles para el tipo y la fecha seleccionada
    const fetchAvailableModels = async (type, date) => {
        try {
            const response = await fetch(`http://tuservidor.com/get-available-models?type=${type}&date=${date}`);
            if (response.ok) {
                const data = await response.json();
                return data.availableModels;
            }
            throw new Error('Network response was not ok.');
        } catch (error) {
            console.error('Error fetching available models:', error);
            return [];
        }
    };

    // Actualiza las opciones de modelos cuando cambia el tipo de bicicleta seleccionado o la fecha de reserva
    bikeTypeSelect.addEventListener('change', updateBikeModels);
    reservationDateInput.addEventListener('change', updateBikeModels);

    // Función para enviar la reserva al servidor
    const addReservation = async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const reservationData = {
            date: reservationDateInput.value,
            name: nameInput.value,
            bikeType: bikeTypeSelect.value,
            bikeModel: bikeModelSelect.value
        };

        try {
            const response = await fetch('http://tuservidor.com/add-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Reservation added successfully:', data);
                // Aquí podrías agregar lógica para mostrar un mensaje de éxito o redirigir a otra página
            } else {
                throw new Error('Failed to add reservation.');
            }
        } catch (error) {
            console.error('Error adding reservation:', error);
            // Aquí podrías agregar lógica para mostrar un mensaje de error al usuario
        }
    };

    // Escucha el envío del formulario de reserva
    reservationForm.addEventListener('submit', addReservation);
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const bikeTypeSelect = document.getElementById('bike-type');
    const bikeModelSelect = document.getElementById('bike-model');
    const reservationDateInput = document.getElementById('reservation-date');
    const nameInput = document.getElementById('name');
    const reservationForm = document.getElementById('add-reservation-form');

    // Define los modelos de bicicletas correspondientes a cada tipo
    const bikeModels = {
        Electric_Bike: ["Model A", "Model B", "Model C"],
        Scooter: ["Model X", "Model Y", "Model Z"]
    };

    // Función para actualizar las opciones de modelos según el tipo de bicicleta seleccionado y la disponibilidad
    const updateBikeModels = async () => {
        const selectedType = bikeTypeSelect.value;
        const selectedDate = reservationDateInput.value;

        // Limpia las opciones actuales y agrega una opción por defecto
        bikeModelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';

        if (selectedType && bikeModels[selectedType]) {
            // Filtra los modelos disponibles para el tipo de bicicleta seleccionado y la fecha seleccionada
            const availableModels = await fetchAvailableModels(selectedType, selectedDate);

            availableModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                bikeModelSelect.appendChild(option); // Agrega cada modelo como una opción
            });
        }
    };

    // Función para obtener los modelos de bicicletas disponibles para el tipo y la fecha seleccionada
    const fetchAvailableModels = async (type, date) => {
        try {
            const response = await fetch(`http://tuservidor.com/get-available-models?type=${type}&date=${date}`);
            if (response.ok) {
                const data = await response.json();
                return data.availableModels;
            }
            throw new Error('Network response was not ok.');
        } catch (error) {
            console.error('Error fetching available models:', error);
            return [];
        }
    };

    // Función para verificar si la reserva es posible
    const verificarReservaPosible = async () => {
        const selectedType = bikeTypeSelect.value;
        const selectedDate = reservationDateInput.value;

        if (!selectedType || !selectedDate) {
            // No se ha seleccionado un tipo de bicicleta o una fecha
            alert('Please select a bike type and a reservation date.');
            return false;
        }

        // Realizar la solicitud al servidor para verificar la disponibilidad
        try {
            const response = await fetch(`http://tuservidor.com/check-availability?type=${selectedType}&date=${selectedDate}`);
            if (response.ok) {
                const data = await response.json();
                if (data.available) {
                    // La reserva es posible
                    return true;
                } else {
                    // No hay disponibilidad para la fecha y el tipo de bicicleta seleccionados
                    alert('Sorry, there is no availability for the selected bike type and date.');
                    return false;
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error('Error checking availability:', error);
            alert('Error checking availability. Please try again later.');
            return false;
        }
    };

    // Configurar la fecha mínima en el campo de fecha de reserva
    const today = new Date().toISOString().split('T')[0];
    reservationDateInput.min = today;

    // Escucha el envío del formulario de reserva
    reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        // Verificar si la reserva es posible
        const reservaEsPosible = await verificarReservaPosible();

        if (reservaEsPosible) {
            // La reserva es posible, proceder con el envío del formulario
            reservationForm.submit();
        } else {
            // La reserva no es posible, no se envía el formulario
            console.log('La reserva no es posible.');
        }
    });

    // Actualiza las opciones de modelos cuando cambia el tipo de bicicleta seleccionado o la fecha de reserva
    bikeTypeSelect.addEventListener('change', updateBikeModels);
    reservationDateInput.addEventListener('change', updateBikeModels);

});
