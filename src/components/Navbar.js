import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation

export default function Navbar() {
  const location = useLocation();  // Get the current location

  // Helper function to add 'active' class based on the current route
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/')}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${isActive('/about')}`} to="/about">About</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
