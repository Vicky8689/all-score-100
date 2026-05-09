import React, { useEffect, useState } from "react";
import "../../assets/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "../NavBar/Navbar";
import SuccessStories from "../SuccessStories/SuccessStories";
import Services from "../CourseCard/Services";
import Blog from "../Blog/Blog";
import Team from "../Team/Team";
import Testimonial from "../Testimonial/Testimonial";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import About from "../About/About";
import CustomCarousel from "../CustomCarousel/CustomCarousel";

import { getFacts } from "../../Services/commonService";

const Index = () => {

  const [facts, setFacts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    fetchFacts();
  }, []);

  const fetchFacts = async () => {
    try {
      const data = await getFacts();
      setFacts(data);
    } catch (error) {
      console.error("Error loading facts:", error);
    }
  };

  return (
    <>
      <Navbar />

      {/* image */}
      <CustomCarousel />

      {/* Facts Section */}
      <div className="container-fluid bg-secondary py-5">
        <div className="container">
          <div className="row">

            {facts.map((fact, index) => (

              <div
                className="col-lg-3"
                key={fact.factId}
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 100}
              >

                <div className="d-flex counter">

                  <h1 className="me-3 text-primary">
                    {fact.title}
                  </h1>

                  <h5 className="text-white mt-1">
                    {fact.description}
                  </h5>

                </div>

              </div>

            ))}

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