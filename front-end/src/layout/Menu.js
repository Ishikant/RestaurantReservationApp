import React from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    
    <nav className="navbar navbar-dark align-items-start p-0 py-3">
      <div className=" d-flex flex-column p-0 w-100">
        <Link
          className="navbar-brand d-flex  sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-1 mb-3">
            <span className="h3">Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav" id="accordionSidebar">
          <li className="nav-item ">
            <Link className="nav-link  p-2 text-white" to="/dashboard">
              <span className="oi oi-dashboard pe-2" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link  p-2 text-white" to="/search">
              <span className="oi oi-magnifying-glass pe-2" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link  p-2 text-white" to="/reservations/new">
              <span className="oi oi-plus pe-2" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link  p-2 text-white" to="/tables/new">
              <span className="oi oi-layers pe-2" />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
