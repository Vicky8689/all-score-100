import React from "react";
import Navbar from "../components/NavBar/Navbar";
import "../assets/bootstrap.min.css";
import Team from "../components/Team/Team";
import "aos/dist/aos.css"; // Import AOS styles
import CustomCarousel from "../components/CustomCarousel/CustomCarousel"
import Footer from "../components/Footer/Footer"
import About from "../components/About/About"
const AboutPage=()=>{

    return(
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
      <Team/>
      <Footer />
        </>

    );

}
export default AboutPage;


