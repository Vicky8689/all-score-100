import React from "react";
import "./SuccessStories.css";

const SuccessStories = () => {

  const successStories = [

    {
      id: 1,
      img: "img/Success1.jpg",
      name: "Vicky Yadav",
      rank: "AIR 1",
      exam: "CBSE Topper",
      year: "Batch 2015-16",
      score: "98.8%"
    },

    {
      id: 2,
      img: "img/Success2.jpg",
      name: "Rahul Sharma",
      rank: "AIR 56",
      exam: "NEET 2025",
      year: "Batch 2024-25",
      score: "715/720"
    },

    {
      id: 3,
      img: "img/Success3.jpg",
      name: "Priya Verma",
      rank: "AIR 103",
      exam: "JEE Advanced",
      year: "Batch 2024",
      score: "99.4 Percentile"
    },

  ];

  return (

    <section className="modern-success-section">

      <div className="container">

        {/* HEADER */}
        <div className="success-header">

          <span>
            SUCCESS STORIES
          </span>

          <h1>
            Our Toppers Make Us Proud
          </h1>

          <p>
            Thousands of students have achieved
            exceptional ranks and fulfilled
            their dreams with ALL SCORES 100.
          </p>

        </div>

        {/* CARDS */}
        <div className="success-grid">

          {successStories.map((story) => (

            <div
              className="success-card"
              key={story.id}
            >

              {/* IMAGE */}
              <div className="success-image-wrapper">

                <img
                  src={story.img}
                  alt={story.name}
                  className="success-image"
                />

                <div className="success-overlay">

                  <div className="overlay-content">

                    <h3>{story.rank}</h3>

                    <p>{story.exam}</p>

                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="success-content">

                <h2>
                  {story.name}
                </h2>

                <div className="success-meta">

                  <div className="meta-box">

                    <span>Batch</span>

                    <h4>{story.year}</h4>

                  </div>

                  <div className="meta-box">

                    <span>Score</span>

                    <h4>{story.score}</h4>

                  </div>

                </div>

                <button className="success-btn">

                  View Journey →

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );
};

export default SuccessStories;