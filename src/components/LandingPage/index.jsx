import React, { useEffect } from "react";
import "../../assets/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import Navbar from "../NavBar/Navbar";
import SuccessStories from "../SuccessStories/SuccessStories"
// import Courses from "../CourseCard/CourseCard ";
import Services from "../CourseCard/Services";
import Blog from "../Blog/Blog";
import Team from "../Team/Team";
import Testimonial from "../Testimonial/Testimonial"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"
import About from "../About/About"
import CustomCarousel from "../CustomCarousel/CustomCarousel"
const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Whether animation runs only once
    });
  }, []);

  return (
    <>
      <Navbar />
      {/* image */}
      <CustomCarousel />

      {/* Scroll Animation Section facts*/}
      <div className="container-fluid bg-secondary py-5">
        <div className="container">
          <div className="row">
            {/* Fact 1 */}
            <div
              className="col-lg-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="d-flex counter">
                <h1 className="me-3 text-primary">100+</h1>
                <h5 className="text-white mt-1">
                  Students successfully placed in best engineering and medical
                  colleges across Mumbai and Navi Mumbai.
                </h5>
              </div>
            </div>

            {/* Fact 2 */}
            <div
              className="col-lg-3"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="d-flex counter">
                <h1 className="me-3 text-primary">9+</h1>
                <h5 className="text-white mt-1">
                  Years of educational mastery, a journey of knowledge,
                  discovery, and growth.
                </h5>
              </div>
            </div>

            {/* Fact 3 */}
            <div
              className="col-lg-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="d-flex counter">
                <h1 className="me-3 text-primary">9000+</h1>
                <h5 className="text-white mt-1">
                  Students who loved ALL SCORES 100 Education Center.
                </h5>
              </div>
            </div>

            {/* Fact 4 */}
            <div
              className="col-lg-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="d-flex counter">
                <h1 className="me-3 text-primary">5</h1>
                <h5 className="text-white mt-1">
                  Stars reviews given by satisfied students and parents.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <About />
      <Services />

      <SuccessStories />

      <Blog />

      <Team />

      <Testimonial />
      <Contact />
      <Footer />

    </>
  );
};

export default Index;
