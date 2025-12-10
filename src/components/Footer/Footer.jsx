import React from "react";
import '../../assets/common.css';


const Footer = () => {
  return (
    <div className="container-fluid footer bg-dark wow fadeIn" data-wow-delay=".3s">
      <div className="container pt-5 pb-4">
        <div className="row g-5">
          <div className="col-lg-3 col-md-6">
            <a href="index.html">
              <h1 className="text-white fw-bold d-block">
                ALL SCORES <span className="text-secondary">100</span>
              </h1>
            </a>
            <p className="mt-4 text-light">EDUCATIONAL CENTER. Learn to invent!!</p>
            <div className="d-flex hightech-link">
              <a href="#" className="btn-light nav-fill btn btn-square rounded-circle me-2">
                <i className="fab fa-facebook-f text-primary"></i>
              </a>
              <a href="#" className="btn-light nav-fill btn btn-square rounded-circle me-2">
                <i className="fab fa-twitter text-primary"></i>
              </a>
              <a href="#" className="btn-light nav-fill btn btn-square rounded-circle me-2">
                <i className="fab fa-instagram text-primary"></i>
              </a>
              <a href="#" className="btn-light nav-fill btn btn-square rounded-circle me-0">
                <i className="fab fa-linkedin-in text-primary"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-secondary">Short Link</h3>
            <div className="mt-4 d-flex flex-column short-link">
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>About us
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Contact us
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Our Services
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Our Projects
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Latest Blog
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-secondary">Help Link</h3>
            <div className="mt-4 d-flex flex-column help-link">
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Terms Of use
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Privacy Policy
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Helps
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>FQAs
              </a>
              <a href="#" className="mb-2 text-white">
                <i className="fas fa-angle-right text-secondary me-2"></i>Contact
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h3 className="text-secondary">Contact Us</h3>
            <div className="text-white mt-4 d-flex flex-column contact-link">
              <a href="#" className="pb-3 text-light border-bottom border-primary">
                <i className="fas fa-map-marker-alt text-secondary me-2"></i> NL 1-A / 37, Sector 10, Nerul, Navi Mumbai
              </a>
              <a href="#" className="py-3 text-light border-bottom border-primary">
                <i className="fas fa-phone-alt text-secondary me-2"></i> +91 9702045052
              </a>
              <a href="#" className="py-3 text-light border-bottom border-primary">
                <i className="fas fa-envelope text-secondary me-2"></i> allscores100@gmail.com
              </a>
            </div>
          </div>
        </div>
        <hr className="text-light mt-5 mb-4" />
        <div className="row">
          <div className="col-md-6 text-center text-md-start">
            <span className="text-light">
              <a href="#" className="text-secondary">
                <i className="fas fa-copyright text-secondary me-2"></i>ALL SCORES 100
              </a>
              , All right reserved.
            </span>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="text-light">
              Designed By :-vky 😊 
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
