import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
//import "./Testimonial.css";
import '../../assets/common.css';

const Testimonial = () => {
  const testimonials = [
    {
      imgSrc: "img/sumit.jpg",
      name: "Sumit Jaiswal (Ex. Student)",
      profession: "Physician Associate",
      stars: 5,
      feedback:
        "An excellent place and study center to learn XI and XII Sci. Dedicated, Experienced and fully helping teachers!! Kudos to the management!!",
    },
    {
      imgSrc: "img/vicky1.jpg",
      name: "Vicky Yadav (Ex Student)",
      profession: "Computer Science Engineer",
      stars: 5,
      feedback:
        "Best Coaching Center to learn 11th, 12th Sci & MHCET. Well Qualified n Experienced Teachers. Great Job..",
    },
    {
      imgSrc: "img/manju.jpg",
      name: "Dr. Manju Yadav (Ex Student)",
      profession: "Doctor",
      stars: 5,
      feedback:
        "Enrolling in this coaching center has been a transformative experience; the expert guidance and comprehensive curriculum.",
    },
    {
      imgSrc: "img/ratnakar.jpg",
      name: "Mr. Ratnakar Kudale (Parent)",
      profession: "Profession",
      stars: 5,
      feedback:
        "As a parent, I must say that choosing this coaching center was a game changer in the career of my son.",
    },
  ];

  return (
    <div className="container-fluid testimonial py-5 mb-5">
      <div className="container">
        <div
          className="text-center mx-auto pb-5 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="text-primary">Our Testimonial</h1>
          <h4>Our Ex.Students & Parent's Saying!</h4>
        </div>
        <OwlCarousel
          className="owl-theme section"
          margin={20}
          autoplay
          data-wow-delay=".5s"
          loop
          items={3}
          autoplayTimeout={3000}
          autoplayHoverPause
        >
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-item border p-4">
              <div className="d-flex align-items-center">
                <div>
                  <img src={item.imgSrc} alt={item.name} />
                </div>
                <div className="ms-4">
                  <h4 className="text-secondary">{item.name}</h4>
                  <p className="m-0 pb-3">{item.profession}</p>
                  <div className="d-flex">
                    {Array.from({ length: item.stars }).map((_, starIndex) => (
                      <i
                        key={starIndex}
                        className="fas fa-star me-1 text-primary"
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-top mt-4 pt-3">
                <p className="mb-0">{item.feedback}</p>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default Testimonial;
