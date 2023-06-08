import React, { useState } from "react";
import { listReservations, updateReservationStatus } from "../utils/api";
import Reservation from "../reservations/Reservation";
import ErrorAlert from "../layout/ErrorAlert";

function SearchBox() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [foundReservations, setFoundReservations] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const[updateReservationStatusError, setUpdateReservationStatusError] = useState(null);
  const[reservationsError, setReservationsError] = useState(null);

  const handleChange = ({ target }) => {
    setPhoneNumber(target.value);
  };

  function searchHandler(event) {
    const abortController = new AbortController();
    const mobile_number = phoneNumber;

    setSearchError(null);

    setFoundReservations([]);

    listReservations({ mobile_number }, abortController.signal)
      .then(setFoundReservations)
      .then(() => {
        setHasSearched(true);
      })
      .catch(setSearchError);

    return () => abortController.abort();
  }

  function cancelReservationHandler(reservation_id) {
    const abortController = new AbortController();
    const text =
      "Do you want to cancel this reservation? This cannot be undone.";

    setUpdateReservationStatusError(null);
    setReservationsError(null);

    if (window.confirm(text)) {
      updateReservationStatus(reservation_id, abortController.signal)
        .then(
          listReservations({ mobile_number: phoneNumber }, abortController.signal)
            .then(setFoundReservations)
            .catch(setReservationsError)
        )
        .catch(setUpdateReservationStatusError);

      return true;
    }

    return false;
  }

  return (
    <div className="mt-4 justify-content-center container">
      <ErrorAlert error={searchError} />
      <ErrorAlert error={updateReservationStatusError} />
      <ErrorAlert error={reservationsError} />

      

      <div className="input-group">
        <input
              placeholder="Enter a customer's phone number."
              name="mobile_number"
              type="tel"
              id="form1"
              className="form-control"
              onChange={handleChange}
               required
            />
          
        <button
          type="submit"
          className="btn btn-primary"
          onClick={searchHandler}
        >
          Find
        </button>
      </div>
      {hasSearched && !foundReservations.length ? (
        <ErrorAlert error={{ message: "No reservation available for the phone number" }} />
      ) : (
        ""
      )}
      <div className="reservations-div">

      {foundReservations.length?(
              <table className="mt-3 table table-responsive table-bordered">
              <thead><tr><th>Id</th><th>Reservation Time</th><th>First Name</th><th>Last Name</th><th>Party Size</th><th>Phone Number</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
        {foundReservations.map((reservation, index) => (
          <Reservation key={index} reservation={reservation} cancelHandler={cancelReservationHandler}/>
        ))}

      </tbody>
      </table>
      ) : (
        ""
      )}  
      </div>
    </div>
  );
}

export default SearchBox;
