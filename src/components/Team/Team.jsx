import React from "react";
//import "./Team.css";
import '../../assets/common.css';

import { Carousel } from "react-bootstrap";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";

const teamMembers = [
  {
    name: "Prof. Er. Suresh Kumar D Yadav",
    title: "Founder|Director,B.E.(Mechanical)",
    specialization: "Maths | Engineering | IIT-JEE",
    experience: "9+ years of Teaching Experience",
    imgSrc: "img/team-1.jpg",
  },
  {
    name: "Aditi Chaubey",
    title: "M.Sc (In-organic Chemistry)",
    specialization: "Chemistry",
    experience: "6+ years of Teaching Experience",
    imgSrc: "img/team-2.jpg",
  },
  {
    name: "Santosh Jadhav",
    title: "M.Sc (Physical Chemistry)",
    specialization: "Chemistry",
    experience: "6+ years of Teaching Experience",
    imgSrc: "img/santosh.jpg",
  },
  {
    name: "Kartik Mishra",
    title: "M.Sc (Micro-Biology)",
    specialization: "Zoology | Botany",
    experience: "7+ years of Teaching Experience",
    imgSrc: "img/kartik.jpg",
  },
  {
    name: "Dr. Samiksha P Kamble",
    title: "B.A.M.S (Mum)",
    specialization: "Biology",
    experience: "5+ years of Teaching Experience",
    imgSrc: "img/samiksha.jpg",
  },
  {
    name: "Dr. Suman Panigrahi",
    title: "BDS",
    specialization: "Biology",
    experience: "6+ years of Teaching Experience",
    imgSrc: "img/suman.jpg",
  },
  {
    name: "Ashfak Shaikh",
    title: "B.E. (Mechanical)",
    specialization: "Physics | Engineering | IIT-JEE",
    experience: "9+ years of Teaching Experience",
    imgSrc: "img/team-4.jpg",
  },
  {
    name: "Ravindra Chauhan",
    title: "M.Sc (Computer Science), D.El.Ed",
    specialization: "Computer Science | Programming",
    experience: "9+ years of Teaching Experience",
    imgSrc: "img/ravi.jpg",
  },
  {
    name: "Dr. Shivani Thakur",
    title: "M.D.S (Dental)",
    specialization: "Zoology",
    experience: "5+ years of Teaching Experience",
    imgSrc: "img/team-3.jpg",
  },
];

const TeamCard = ({ member }) => {
  return (
    
    
 <div className="container-fluid testimonial py-5 mb-5">
      <div className="container">
        <div
          className="text-center mx-auto pb-5 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h5 className="text-primary">Our Tems</h5>
          <h1>Meet our Subject Experts</h1>
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
         {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="rounded team-item"
                            style={{ width: "fit-content" }}
                        >
                            <div className="team-content">
                                <div className="team-img-icon">
                                    <div className="team-img rounded-circle">
                                        <img
                                            src={member.imgSrc}
                                            className="img-fluid w-100 rounded-circle"
                                            alt={member.name}
                                        />
                                    </div>
                                    <div className="team-name text-center py-3">
                                        <h4>{member.name}</h4>
                                        <p className="m-0">{member.title}</p>
                                        <p className="m-0">
                                            Specialization : {member.specialization}
                                        </p>
                                        <p className="m-0">
                                            {member.experience}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

const TeamList = () => {
  return (
    <TeamCard member={teamMembers} />
   );
};

export default TeamList;
