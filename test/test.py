import unittest
import requests

class TestBookingCalendar(unittest.TestCase):

    def test_calendar_page_content(self):
        # Make an HTTP request to the local server for the calendar page
        response = requests.get("http://localhost:4000/bookings/calendar")

        # Verify if the request was successful (status code 200)
        self.assertEqual(response.status_code, 200)

        # Verify if the obtained HTML contains the title "Check bicycle availability"
        self.assertIn("<h1>Check bicycle availability</h1>", response.text)

    def test_reservation_page_content(self):
        # Make an HTTP request to the local server for a specific date
        date = "28/06/2024"
        response = requests.get(f"http://localhost:4000/bookings/calendar?date={date}")

        # Verify if the request was successful (status code 200)
        self.assertEqual(response.status_code, 200)

        # Verify if the obtained HTML contains the text "Results for date"
        self.assertIn("Results for date", response.text)

        # Verify if there are bicycles available for reservation
        self.assertIn("bike-form-container", response.text)

        # Verify the number of forms available for reservation
        num_forms = response.text.count("bike-form-container")
        self.assertTrue(num_forms == 8, "No forms were found for bike reservations")

if __name__ == "__main__":
    unittest.main()
