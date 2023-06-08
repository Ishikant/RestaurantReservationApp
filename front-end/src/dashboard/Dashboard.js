import React, { useEffect, useState, useCallback } from "react";
import {
  listReservations,
  listTables,
  finishTablesAndReservations,
  updateReservationStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservation from "../reservations/Reservation";
import Table from "../tables/Table";
import { today, previous, next } from "../utils/date-time";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [updateReservationStatusError, setUpdateReservationStatusError] = useState(null);
  const [tables, setTables] = useState([]);
  
  const useQuery = () => new URLSearchParams(useLocation().search);
  let query = useQuery();
  const [currentDate, setCurrentDate] = useState(query.get("date") ?? today());

  useEffect(() => {
    if (query.get("date")) {
      setCurrentDate(query.get("date"));
    }

  }, [query]);

  const loadDashboard = useCallback(() => {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }, [currentDate]);

  useEffect(() => {
    loadDashboard();
  }, [ currentDate, loadDashboard]);

  async function finishHandler(table_id) {
    const abortController = new AbortController();
    const text =
      "Is this table ready to seat new guests? This cannot be undone.";
	
	
	// return true if the user clicked OK and  then perform API request 
	// else return false so nothing happens 
    if (window.confirm(text)) {
      try {
        await finishTablesAndReservations(table_id, abortController.signal);
        try {
          const tablesResponse = await listTables(abortController.signal);
          setTables(tablesResponse);
          const reservationsResponse = await listReservations({
            date: currentDate,
          });
          setReservations(reservationsResponse);
        } catch (listError) {
          setReservationsError(listError);
        }
      } catch (finishError) {
        console.error(finishError);
      }
      return true;
    }

    return false;
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
          listReservations({ date: currentDate }, abortController.signal)
            .then(setReservations)
            .catch(setReservationsError)
        )
        .catch(setUpdateReservationStatusError);

      return true;
    }

    return false;
  }

  function showPrevDay() {
    const yesterday = previous(currentDate);
    setCurrentDate(yesterday);
  }

  function showNextDay() {
    const tommorow = next(currentDate);
    setCurrentDate(tommorow);
  }

  function showToday() {
    setCurrentDate(today());
  }

  return (
    <main>
      <div className="d-flex my-3 px-2">
        <div className="col">
          <h2>Dashboard</h2>
        </div>
        <div className="col-auto">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn btn-secondary" onClick={showPrevDay}>Previous</button>
        <button className="btn btn-outline-primary " onClick={showToday}>Today</button>
        <button className="btn btn-outline-secondary" onClick={showNextDay}>Next</button>
      </div>
      </div>
      </div>

      <div className="card  mb-3">
          <div className="card-header border-bottom d-flex align-items-center">
            <div className="card-title fs-3 fw-bold"><h4 className="mb-0">Reservations for <small className="text-muted">{currentDate}</small></h4></div>
          </div>
          <div className="card-body">
          <div className="reservations-div">
          
            {reservations.length?(
              <table className="table table-responsive table-bordered">
               <thead><tr><th>Id</th><th>Reservation Time</th><th>First Name</th><th>Last Name</th><th>Party Size</th><th>Phone Number</th><th>Status</th><th>Actions</th></tr></thead>
             <tbody>
              {reservations.map((reservation, index) => (
                <Reservation
                  key={index}
                  reservation={reservation}
                  cancelHandler={cancelReservationHandler}
                />
              ))}
            </tbody>
            </table>
            ) : (
              <p className="alert alert-info">No reservation available for this date</p>
            )}    
                
          </div>
      </div></div>


      <div className="card mb-3">
          <div className="card-header border-bottom d-flex align-items-center">
            <div className="card-title fs-3 fw-bold"><h4 className="mb-0">Tables</h4></div>
          </div>
          <div className="card-body">
          <div className="reservations-div">
            <table className="table table-responsive table-bordered">
              <thead><tr><th>Id</th><th>Name</th><th>Capacity</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {tables.map((table, index) => (
                <Table key={index} table={table} finishHandler={finishHandler} />
              ))}
              </tbody>
              </table>
            </div>
          </div>
      </div>
      
      
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={updateReservationStatusError} />

      
    </main>
  );
}

export default Dashboard;
