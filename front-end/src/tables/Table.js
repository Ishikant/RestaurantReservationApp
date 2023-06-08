import React, { useEffect, useState } from "react";


function Table({ table, finishHandler }) {
  const [occupied, setOccupied] = useState(false);
  const [finished, setFinished] = useState(false);

  async function changeText(){
    //update only if the user clicks OK in the window
    const confirmed = await finishHandler(table.table_id)
  
    if(confirmed){
      setFinished(true);
      setOccupied(false);
    } 
  }

  //change occupied state when the table's reservation_id is no longer null
  useEffect(() => {
    if(table.reservation_id){
       setOccupied(true);
       setFinished(false);
    }
  }, [table.reservation_id])

  return (
    <tr>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{occupied ? (
          <p className="badge bg-danger badge-sm" data-table-id-status={table.table_id}>Occupied</p>
        ) : (
          <p className="badge bg-success badge-sm" data-table-id-status={table.table_id}>Free</p>
        )}</td>
      <td>{!finished && occupied ? (
          <button  className="btn btn-outline-primary" data-table-id-finish={table.table_id} onClick={changeText}>
            Finish
          </button>
        ) : (
          <p />
        )}</td>
    </tr>
    
  );
}

export default Table;
