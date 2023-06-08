import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

function TableForm() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    if(target.name === "capacity"){
      setFormData({
        ...formData,
        [target.name]: parseInt(target.value),
      });
    }
    else{
      setFormData({
      ...formData,
      [target.name]: target.value,
    });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log("Submitted:", formData);

    setFormData({ ...initialFormState });

    createTable(formData)
        .then(() => {
            history.push("/")
        })
        .catch(setError)
  };

  function cancelHandler(){
    history.goBack();
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
    <div className="w-50 card p-3">
      <ErrorAlert error={error}/>
      <form>
        <div className="form-group mb-3">
          <label htmlFor="table_name">Table Name</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="table_name"
            value={formData.table_name}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="capacity">Capacity</label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            name="capacity"
            value={formData.capacity}
          />
        </div>
        <button
          type="submit"
          onClick={submitHandler}
          className="btn btn-outline-primary  me-md-2 "
        >
          Submit
        </button>
        <button className="btn btn-outline-danger  " type="button" onClick={cancelHandler}>
          Cancel
        </button>
      </form>
    </div></div>
  );
}

export default TableForm;
