import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Facts.css"; // Optional: Add custom CSS if needed.

const Facts = () => {
  return (
    <div>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 light-img"
          src="/img/Banner.jpg"
          alt="First slide"
        />
        <Carousel.Caption className="centered-caption">
          <h2
            className="text-white fw-bold d-block"
            data-aos="fade-down"
          >
            <span className="text-secondary">Best Coaching Center</span>
          </h2>
          <h1
            className="text-white fw-bold d-block"
            data-aos="fade-right"
          >
            ALL SCORES <span className="text-secondary">100</span>{" "}
            EDUCATIONAL CENTER
          </h1>
          <p data-aos="fade-up">
            Learn to invent!!
            <br />
            The aim and objective of the institute is to provide
            world-class education worldwide.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 light-img"
          src="/img/Banner1.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h6
            className="text-secondary h4 animated fadeInUp"
            style={{ fontSize: "2rem" }}
            data-aos="fade-up"
          >
            Best Coaching Center
          </h6>
          <h1
            className="text-white display-1 mb-4"
            style={{ fontSize: "2rem" }}
            data-aos="fade-left"
          >
            Quality Education Services You Really Need!
          </h1>
          <p
            className="mb-4 text-white fs-5"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Providing world-class teaching to aspirants at a very low
            cost.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
  );
};

export default Facts;
