import React, { useEffect, useState } from "react";

function Reservation({ reservation, cancelHandler }) {

  const [status, setStatus] = useState(reservation.status);
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    setStatus(reservation.status)
    if(reservation.status === "cancelled")
      setCancelled(true);
  }, [reservation.status])

  function setToCanceled(){
    
    if(cancelHandler(reservation.reservation_id)){
      setCancelled(!cancelled);
      setStatus("cancelled");
    }
  }

  return (

    <tr>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.reservation_date} {reservation.reservation_time}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td> {reservation.people}</td>
      <td>{reservation.mobile_number}</td>
      <td >{ status === 'cancelled' ? <p className="badge text-bg-danger">{status}</p>:<p className="badge text-bg-dark">{status}</p>}</td>
      <td>{ status === "booked" ? (<a href={`/reservations/${reservation.reservation_id}/seat`}><button className="btn btn-sm btn-outline-primary mb-0 me-1" type="submit">Seat</button></a>) :(<p></p>) }
        { status === "booked" ? (<a href={`/reservations/${reservation.reservation_id}/edit`}><button className="btn btn-sm btn-outline-secondary mb-0 me-1">Edit</button></a>) :(<p></p>) }
        { cancelled || reservation.status === "finished"
        ? <p></p>
        : <button className="btn btn-sm btn-outline-danger" onClick={setToCanceled} data-reservation-id-cancel={reservation.reservation_id}>Cancel</button> 
        }</td>
    </tr>
    
  );
}

export default Reservation;
