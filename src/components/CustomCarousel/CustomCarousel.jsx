import React from "react";
import { Carousel } from "react-bootstrap";
//import './CustomCarousel.css'
import '../../assets/common.css';

const CustomCarousel = () => {
  const slides = [
    {
      image: "/img/SlideFirst.jpeg",
      alt: "First slide",
      subheading: "Best Coaching Center",
      title: "ALL SCORES 100 EDUCATIONAL CENTER",
      description:
        "Learn to invent!! The aim and objective of the institute is to provide world-class education worldwide.",
    },
    {
      image: "/img/Slidesecond.jpeg",
      alt: "Second slide"
      // subheading: "Best Coaching Center",
      // title: "Quality Education Services You Really Need!",
      // description: "Providing world-class teaching to aspirants at a very low cost.",
    },
     {
      image: "/img/SlideThird.jpeg",
      alt: "Second slide"
      // subheading: "Best Coaching Center",
      // title: "Quality Education Services You Really Need!",
      // description: "Providing world-class teaching to aspirants at a very low cost.",
    },
     {
      image: "/img/Slidefourth.jpeg",
      alt: "Second slide"
      // subheading: "Best Coaching Center",
      // title: "Quality Education Services You Really Need!",
      // description: "Providing world-class teaching to aspirants at a very low cost.",
    },
    {
      image: "/img/Slidefive.jpeg",
      alt: "Second slide"
      // subheading: "Best Coaching Center",
      // title: "Quality Education Services You Really Need!",
      // description: "Providing world-class teaching to aspirants at a very low cost.",
    },
    {
      image: "/img/Slidesix.jpeg",
      alt: "Second slide"
      // subheading: "Best Coaching Center",
      // title: "Quality Education Services You Really Need!",
      // description: "Providing world-class teaching to aspirants at a very low cost.",
    },
  ];

  return (
    <Carousel>
      {slides.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100  h-75  light-img"
            src={slide.image}
            alt={slide.alt}
          />
          <Carousel.Caption className="text-center d-flex flex-column justify-content-center align-items-center">
            <h2
              className={`text-white fw-bold d-block ${slide.headingClass || ""}`}
              data-aos="fade-down"
            >
              <span className="text-secondary">{slide.subheading}</span>
            </h2>
            <h1
              className={`text-white fw-bold d-block ${slide.titleClass || ""}`}
              data-aos="fade-right"
            >
              {slide.title}
            </h1>
            <p className="text-white" data-aos="fade-up">
              {slide.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
