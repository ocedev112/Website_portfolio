import "./styles/bookdemo.css";

import { useState } from "react";

const BookMeeting = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [bookingLink, setBookingLink] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const CALENDAR_API_KEY = import.meta.env.VITE_CALENDAR_API_kEY;

  const EVENT_TYPE_UUID =
    "https://api.calendly.com/event_types/e5d62031-8e47-415a-ba3d-f9dbca23b669";

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api.calendly.com/scheduling_links",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${CALENDAR_API_KEY}`,
          },
          body: JSON.stringify({
            max_event_count: 1,
            owner: EVENT_TYPE_UUID,
            owner_type: "EventType",
            invitee: {
              name: formData.name,
              email: formData.email,
            },
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to schedule", errorData);
      }

      const data = await response.json();
      console.log("data ", data);

      const booking_url = data.resource.booking_url;
      setBookingLink(booking_url);
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="book_demo_container h-screen w-screen bg-white flex flex-col justify-center gap-4 items-center">
      <p className="booking-header text-3xl uppercase ">
        Schedule a Meeting with me
      </p>
      <div className="booking-paragraph">
        Enter your details to create a booking link
      </div>
      <form
        className="booking-form flex flex-col justify-start items-center gap-2 pt-10"
        onSubmit={(e) => {
          handleBooking(e);
        }}
      >
        <div className="booking-user-info flex flex-col justify-center items-center gap-2">
          <input
            className="booking-input"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className="booking-input"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <button className="book-demo-btn" type="submit" disabled={isLoading}>
          {isLoading ? "creating link..." : "schedule meeting"}
        </button>
      </form>
      {bookingLink != null && (
        <a href={bookingLink} className="booking-link underline">
          Click here to book a meeting
        </a>
      )}
    </div>
  );
};

export default BookMeeting;
