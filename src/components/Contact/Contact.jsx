import React, { useState } from "react";
import '../../assets/common.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    course: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
 
  };

  return (
    <div className="container-fluid py-5 mb-5">
      <div className="container">
        <div
          className="text-center mx-auto pb-5 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h5 className="text-primary">Get In Touch</h5>
          <h1 className="mb-3">Contact for any query</h1>
        </div>
        <div className="contact-detail position-relative p-5">
          <div className="row g-5 mb-5 justify-content-center">
            <div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
              <div className="d-flex bg-light p-3 rounded">
                <div
                  className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <i className="fas fa-map-marker-alt text-white"></i>
                </div>
                <div className="ms-3">
                  <h4 className="text-primary">Address</h4>
                  <a
                    href="https://goo.gl/maps/Zd4BCynmTb98ivUJ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h5"
                  >
                    <span style={{ fontSize: "medium" }}>
                      NL 1-A / 37, Sector 10, Nerul, Navi Mumbai - 400706
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
              <div className="d-flex bg-light p-3 rounded">
                <div
                  className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <i className="fa fa-phone text-white"></i>
                </div>
                <div className="ms-3">
                  <h4 className="text-primary">Call Us</h4>
                  <a className="h5" href="tel:+0123456789">
                    +91 9702045052
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
              <div className="d-flex bg-light p-3 rounded">
                <div
                  className="flex-shrink-0 btn-square bg-secondary rounded-circle"
                  style={{ width: "64px", height: "64px" }}
                >
                  <i className="fa fa-envelope text-white"></i>
                </div>
                <div className="ms-3">
                  <h4 className="text-primary">Email Us</h4>
                  <a className="h5" href="mailto:allscores100@gmail.com">
                    allscores100@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-6 wow fadeIn" data-wow-delay=".3s">
              <div className="p-5 h-100 rounded contact-map">
                <iframe
                  className="rounded w-100 h-100"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1885.790571631982!2d73.01398894714052!3d19.03816996954258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3e82bb99265%3A0x588e643c0c0ed08a!2sNL%20-%201%20Type%2C%20Nerul%20West%2C%20Nerul%2C%20Navi%20Mumbai%2C%20Maharashtra%20400706!5e0!3m2!1sen!2sin!4v1706712783763!5m2!1sen!2sin"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay=".5s">
              <div className="p-5 rounded contact-form">
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control border-0 py-3"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <select
                    className="form-select py-3"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">You Are A?</option>
                    <option value="Parent">Parent</option>
                    <option value="Student">Student</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control border-0 py-3"
                    placeholder="Your Mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control border-0 py-3"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <select
                    className="form-select py-3"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                  >
                    <option value="">Select a Course</option>
                    <option value="11th & 12th Science">
                      11th & 12th Science
                    </option>
                    <option value="MH-CET">MH-CET</option>
                    <option value="IIT-JEE Mains & Advance">
                      IIT-JEE Mains & Advance
                    </option>
                    <option value="Medical">Medical</option>
                    <option value="Foundation Course|Olympiads">
                      Foundation Course|Olympiads
                    </option>
                    <option value="Programming (IT|CS)">
                      Programming (IT|CS)
                    </option>
                  </select>
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-100 form-control border-0 py-3"
                    rows="6"
                    cols="10"
                    placeholder="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="text-start">
                  <button
                    className="btn bg-primary text-white py-3 px-5"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
