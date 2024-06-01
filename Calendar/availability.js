document.addEventListener('DOMContentLoaded', () => {
    const fetchAvailability = async () => {
        try {
            const response = await fetch('http://tuservidor.com/availability', {
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const availabilityData = await response.json();
            return availabilityData;
        } catch (error) {
            console.error('Error fetching availability:', error);
            return null;
        }
    };

    const calculateAvailability = (availabilityData) => {
        const availability = {};
        for (const type in availabilityData) {
            let freeCount = 0;
            for (const model in availabilityData[type]) {
                if (availabilityData[type][model] === true) {
                    freeCount++;
                }
            }
            availability[type] = freeCount;
        }
        return availability;
    };

    const showAvailability = async () => {
        const availabilityContainer = document.getElementById('availability');
        const availabilityData = await fetchAvailability();
        availabilityContainer.innerHTML = '';
        if (availabilityData) {
            const availability = calculateAvailability(availabilityData);
            for (const key in availability) {
                const availabilityItem = document.createElement('div');
                availabilityItem.textContent = `${key}: ${availability[key]} available`;
                availabilityContainer.appendChild(availabilityItem);
            }
        } else {
            availabilityContainer.textContent = 'Error fetching availability';
        }
    };

    showAvailability();
});
