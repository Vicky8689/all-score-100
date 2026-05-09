import React from "react";
import "../../assets/common.css";

const SuccessStories = () => {
  const successStories = [
    {id:1,blogId:12, img: "img/Success1.jpg", title: "Vicky Yadav",
      desc: "Batch 2015-16 \n Rank: 1 (CBSE) \n STD: 12",},
    {id:2,blogId:2, img: "img/Success3.jpg", title: "Mobile Info", desc: "Upcoming Phone" },
    {id:3,blogId:3, img: "img/Success2.jpg", title: "Cyber Security", desc: "Cyber Security Core" },
    {id:4,blogId:4, img: "img/Success2.jpg", title: "Cyber Security2", desc: "Cyber Security Core2" },
    {id:6,blogId:9, img: "img/Success5.jpg", title: "Digital Marketing", desc: "Marketing Analysis" },
    {id:5,blogId:10, img: "img/Success4.jpg", title: "Web Development", desc: "Web Analysis" },
    {id:7,blogId:22, img: "img/Success6.jpg", title: "Keyword Research", desc: "Keyword Analysis" },
    {id:8,blogId:11, img: "img/Success6.jpg", title: "Vicky Research", desc: "Keyword Analysis" },
  ];

  return (
    <div className="container-fluid project py-5 mb-5">
      <div className="container">
        <div
          className="text-center mx-auto pb-5 wow fadeIn"
          data-wow-delay=".3s"
          style={{ maxWidth: "600px" }}
        >
          <h5 className="text-primary">Success Stories</h5>
          <h2>
            Fueling success stories through our completed batches and
            accomplished students.
          </h2>
        </div>

        <div className="row g-5">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="col-md-6 col-lg-4 wow fadeIn"
              data-wow-delay={`${0.3 + index * 0.2}s`}
            >
              <div className="project-item text-center">
                {/* Image with hover effect */}
                <div className="project-img">
                  <img
                    src={story.img}
                    className="img-fluid w-100 rounded"
                    alt={story.title}
                    style={{ height: "15rem", objectFit: "cover" }}
                  />
                  
                
                </div>

                {/* Title + Description always outside image */}
                <div className="project-info">
                  <h4>{story.title}</h4>
                  <p>{story.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
