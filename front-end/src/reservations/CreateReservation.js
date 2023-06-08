import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";

function CreateReservation() {
  const history = useHistory();

    const initialFormState = {
      first_name: "",
      last_name: "",
      mobile_number: "",
      reservation_date: "",
      reservation_time: "",
      people: 1,
    };

  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState(null);
 

  const handleChange = ({ target }) => {
    if (target.name === "people") {
      setFormData({
        ...formData,
        [target.name]: parseInt(target.value),
      });
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };


  async function submitHandler(event){
    event.preventDefault();

    const abortController = new AbortController();

    try {
      await createReservation(formData, abortController.signal);
      history.push(`/dashboard?date=${formData.reservation_date}`)
    } catch(error){
      setFormError(error)
    }
  }


  function cancelHandler() {
    history.goBack();
  }

  return (
    <div>
      <ErrorAlert error={formError}/>  
      <h3 className="text-center mt-3">Create Reservation</h3>
      <ReservationForm
        handleChange={handleChange}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
        initialFormData={formData}
      />
    </div>
  );
}

export default CreateReservation;
