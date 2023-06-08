import React from "react";

function ReservationForm({handleChange, submitHandler, cancelHandler, initialFormData }) {
  return (
    <div className="d-flex justify-content-center">
      <div className="w-50 card p-3">
        <form onSubmit={submitHandler}>
          <div className="d-flex mb-3 ">
          <div className="form-group col">
            <label htmlFor="first_name">First Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="first_name"
              className="form-control"
              value={initialFormData.first_name}
            />
          </div>
          <div className="ms-2 form-group col">
            <label htmlFor="last_name">Last Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="last_name"
              className="form-control"
              value={initialFormData.last_name}
            />
          </div>
          </div>
          <div className="d-flex mb-3 ">
          <div className="form-group col">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input
              onChange={handleChange}
              type="number"
              pattern="[0-9]*"
              name="mobile_number"
              className="form-control"
              value={initialFormData.mobile_number}
            />
          </div>
          <div className="ms-2 form-group col">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input
              onChange={handleChange}
              type="date"
              placeholder="YYYY-MM-DD" 
              
              name="reservation_date"
              className="form-control"
              value={initialFormData.reservation_date}
            />
          </div>
          </div>
          <div className="d-flex mb-3 ">
          <div className="form-group col">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input
              onChange={handleChange}
              type="time"
              placeholder="HH:MM" 
             
              className="form-control"
              name="reservation_time"
              value={initialFormData.reservation_time}
            />
          </div>

          <div className="form-group ms-2 col">
            <label htmlFor="people">People</label>
            <input
              onChange={handleChange}
              type="number"
              className="form-control"
              name="people"
              value={initialFormData.people}
            />
          </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary me-md-2 "
          >
            Submit
          </button>
          <button className="btn btn-outline-danger " type="button" onClick={cancelHandler}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
