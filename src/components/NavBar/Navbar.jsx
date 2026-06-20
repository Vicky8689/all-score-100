import {React,useState} from "react";
import { NavLink } from "react-router-dom";
import "../../assets/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Navbar.css';
//import '../../assets/common.css';

import AdmissionForm from "../AdmissionForm/AdmissionForm";

const Navbar = () => {
  const [submenuVisible, setSubmenuVisible] = useState({
    science: false,
    commerce: false,
    entrance: false,
  });
  
  const toggleSubmenu = (section) => {
    setSubmenuVisible((prev) => ({ ...prev, [section]: !prev[section] }));
  };
  
  return (
    <>
      {/* Topbar */}
      <div className="container-fluid bg-dark py-2 d-none d-md-flex">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center topbar">
            <div className="top-info d-flex align-items-center">
              {/* <small className="me-3 text-white-50">
                <a href="#">
                  <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
                </a>
                NL 1-A / 37, Sector 10, Nerul, Navi Mumbai
              </small> */}
              {/* <small className="me-3 text-white-80">
                <a href="#">
                  <i className="fas fa-envelope me-2 text-secondary"></i>
                </a>
                allscores100@gmail.com
              </small> */}
            </div>
            <div className="text-secondary d-none d-xl-flex topbar-note">
              <div id="note">
                <big >Note: STD XI & XII Sci Admissions are open</big>
              </div>
            </div>
            <div className="top-link d-flex justify-content-start">
              <a href="#" className="bg-light nav-fill btn btn-sm-square rounded-circle">
                <i className="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="#" className="bg-light nav-fill btn btn-sm-square rounded-circle">
                <i className="fab fa-twitter text-primary"></i>
              </a>
              <a href="#" className="bg-light nav-fill btn btn-sm-square rounded-circle">
                <i className="fab fa-instagram text-primary"></i>
              </a>
              <a href="#" className="bg-light nav-fill btn btn-sm-square rounded-circle me-0">
                <i className="fab fa-linkedin-in text-primary"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="container-fluid bg-primary">
        <div className="container">
          <nav className="navbar navbar-dark navbar-expand-lg py-0">
            <a href="/" className="navbar-brand">
              <h1 className="text-white fw-bold d-block">
                ALL SCORES <span className="text-secondary">100</span>
              </h1>
            </a>
            <button
              type="button"
              className="navbar-toggler me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse bg-transparent" id="navbarCollapse">
              <div className="navbar-nav ms-auto mx-xl-auto p-0 d-flex justify-content-center align-items-center">
                <NavLink to="/home" className="nav-item nav-link" activeClassName="active-link">
                  Home
                </NavLink>
                <NavLink to="/about" className="nav-item nav-link" activeClassName="active-link">
                  About
                </NavLink>
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-item nav-link dropdown-toggle"
                    id="dropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Courses
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {/* Science Section */}
                    <li>
  <a
    className="dropdown-item"
    href="#"
    onClick={() => toggleSubmenu('science')}
  >
    Science
  </a>
  <ul
    id="scienceSubmenu"
    style={{ display: submenuVisible.science ? "block" : "none", paddingLeft: "20px" }}
  >
    <li><a className="dropdown-item" href="/courses/:id/subjects">State Bord</a></li>
    <li><a className="dropdown-item" href="/courses/:id/subjects">CBSC</a></li>
  </ul>
</li>


                    {/* Commerce Section */}
                    <li>
                      <a className="dropdown-item" href="#" id="commerceDropdown">
                        Commerce
                      </a>
                      <ul id="commerceSubmenu" style={{ display: "none", paddingLeft: "20px" }}>
                        <li><a className="dropdown-item" href="#">STD XII</a></li>
                      </ul>
                    </li>

                    {/* Entrance Exams Section */}
                    <li>
                      <a className="dropdown-item" href="#" id="entranceExamsDropdown">
                        Entrance Exams
                      </a>
                      <ul id="entranceSubmenu" style={{ display: "none", paddingLeft: "20px" }}>
                        <li><a className="dropdown-item" href="#">All kinds of Entrance Exams</a></li>
                      </ul>
                    </li>

                    {/* Engineering Section */}
                    <li>
                      <a className="dropdown-item" href="#" id="engineeringDropdown">
                        Engineering Section
                      </a>
                    </li>

                    {/* Medical Section */}
                    <li>
                      <a className="dropdown-item" href="#" id="medicalDropdown">
                        Medical Section
                      </a>
                    </li>
                  </ul>
                </div>

                <NavLink to="/notes" className="nav-item nav-link" activeClassName="active-link">
                  Notes
                </NavLink>
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-item nav-link dropdown-toggle"
                    id="dropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admissions
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                      <button
                        className="dropdown-item"
                        data-bs-toggle="modal"
                        data-bs-target="#admissionFormModal"
                      >
                        Admissions Form
                      </button>
                    </li>
                    <li><a className="dropdown-item" href="/Enqueryform">Enquery Form</a></li>
                  </ul>
                </div>

                {/* <NavLink to="/admissions" className="nav-item nav-link" activeClassName="active-link">
                  Admissions
                </NavLink> */}
                {/* <NavLink to="/pages" className="nav-item nav-link" activeClassName="active-link">
                  Pages
                </NavLink> */}
                <div className="dropdown">
                  <a
                    href="#"
                    className="nav-item nav-link dropdown-toggle"
                    id="dropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                      <NavLink className="dropdown-item" to="/our-team">
                        Our Team
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/testimonials">
                        Our Testimonial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/blogs">
                        Our Blog
                      </NavLink>
                    </li>
                  </ul>
                </div>


                <NavLink to="/contact" className="nav-item nav-link" activeClassName="active-link">
                  Contact
                </NavLink>
              </div>

              {/* Search Bar */}
              <form className="d-flex ms-3 align-items-center justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ width: 'auto', flex: 1 }}
                />
                <button className="btn btn-primary" type="submit" style={{ height: '40px', width: '40px' }}>
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </nav>
        </div>
      </div>
      {/* Modal Start*/}
      <AdmissionForm />
      {/* model end */}
    </>
  );
};

export default Navbar;
