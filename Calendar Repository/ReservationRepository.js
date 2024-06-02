class ReservationRepository {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async addReservation(reservation) {
        try {
            const response = await fetch(`${this.apiUrl}/reservations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            });
            if (!response.ok) {
                throw new Error('Failed to add reservation');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding reservation:', error);
            return null;
        }
    }

    async getReservations() {
        try {
            const response = await fetch(`${this.apiUrl}/reservations`);
            if (!response.ok) {
                throw new Error('Failed to fetch reservations');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching reservations:', error);
            return [];
        }
    }
}
