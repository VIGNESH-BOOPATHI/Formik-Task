// Dashboard.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function Dashboard() {
  return (
    <>
      <nav className={`navbar navbar-dark bg-dark sidebar active`}>
        <div className={`sidebar-sticky`}>
          <ul className="nav ">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link" activeClassName="active">
                <FaHome /> BOOKS
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Author" className="nav-link" activeClassName="active">
                AUTHORS
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Dashboard;