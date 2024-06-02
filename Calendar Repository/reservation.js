document.addEventListener('DOMContentLoaded', () => {
    const bikeTypeSelect = document.getElementById('bike-type');
    const bikeModelSelect = document.getElementById('bike-model');
    const reservationDateInput = document.getElementById('reservation-date');
    const nameInput = document.getElementById('name');
    const reservationForm = document.getElementById('add-reservation-form');

    // Configurar la fecha mínima en el campo de fecha de reserva
    const today = new Date().toISOString().split('T')[0];
    reservationDateInput.min = today;

    // Función para actualizar las opciones de modelos según el tipo de bicicleta seleccionado y la disponibilidad
    const updateBikeModels = async () => {
        const selectedType = bikeTypeSelect.value;
        const selectedDate = reservationDateInput.value;

        // Limpia las opciones actuales y agrega una opción por defecto
        bikeModelSelect.innerHTML = '<option value="" disabled selected>Select a model</option>';

        if (selectedType) {
            // Filtra los modelos disponibles para el tipo de bicicleta seleccionado y la fecha seleccionada
            const availableModels = await ReservationRepository.getAvailableModels(selectedType, selectedDate);

            availableModels.forEach(model => {
                const option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                bikeModelSelect.appendChild(option); // Agrega cada modelo como una opción
            });
        }
    };

    // Escucha el envío del formulario de reserva
    reservationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

        const reservation = {
            name: nameInput.value,
            type: bikeTypeSelect.value,
            model: bikeModelSelect.value,
            date: reservationDateInput.value
        };

        // Verificar si el modelo está disponible
        const isAvailable = await ReservationRepository.isModelAvailable(reservation.type, reservation.model, reservation.date);
        if (isAvailable) {
            // Añadir la reserva al repositorio de datos
            await ReservationRepository.addReservation(reservation);
            alert('Reservation successful!'); // Mensaje de confirmación

            // Mostrar ventana emergente con el mensaje de confirmación
            const confirmationMessage = document.createElement('div');
            confirmationMessage.innerHTML = `
                <p>Your reservation has been successfully made!</p>
                <button id="go-to-payment">Go to payment</button>
            `;
            confirmationMessage.classList.add('confirmation-message');
            document.body.appendChild(confirmationMessage);

            // Manejar el evento de clic en el botón "Go to payment"
            const goToPaymentButton = document.getElementById('go-to-payment');
            goToPaymentButton.addEventListener('click', () => {
                // Redirigir al usuario a la página de pagos
                window.location.href = 'pagina_de_pagos.html'; // Cambia esto por la URL real de tu página de pagos
            });

            reservationForm.reset();
        } else {
            alert('The selected model is not available on this date.');
        }
    });

    // Actualiza las opciones de modelos cuando cambia el tipo de bicicleta seleccionado o la fecha de reserva
    bikeTypeSelect.addEventListener('change', updateBikeModels);
    reservationDateInput.addEventListener('change', updateBikeModels);
});
