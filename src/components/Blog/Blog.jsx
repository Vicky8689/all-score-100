import React from 'react';
//import './blog.css';
import '../../assets/common.css';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      image: 'img/blog-1.jpg',
      tag: "Teacher's Day Celebration",
      authorImage: 'img/admin1.jpg',
      author: 'Suresh Yadav',
      date: '5th September 2023',
      description: "On Teacher's Day, we honor the guiding lights who illuminate our paths to knowledge, shaping not just our minds but our destinies.",
      shares: 5324,
      comments: 5,
    },
    {
      id: 2,
      image: 'img/blog-2.jpg',
      tag: 'Birthday Celebrations',
      authorImage: 'img/admin1.jpg',
      author: 'Suresh Yadav',
      date: '1st Nov 2023',
      description:
        "In the joyful celebration of a student's birthday, the classroom becomes a canvas of shared smiles and laughter, as classmates come together to create cherished memories and celebrate the unique brilliance each student brings.",
      shares: 5324,
      comments: 5,
    },
    {
      id: 3,
      image: 'img/blog-3.jpg',
      tag: 'A Visit to Health Gurus',
      authorImage: 'img/admin1.jpg',
      author: 'Suresh Yadav',
      date: '30th Jan 2024',
      description:
        "A special visit to health gurus offers a unique opportunity to tap into the wisdom of wellness experts, paving the way for individuals to discover the keys to holistic health and embark on a path of self-care and vitality.",
      shares: 5324,
      comments: 5,
    },
    
  ];

  return (
    <div className="container-fluid blog py-5 mb-5">
      <div className="container">
        <div className="text-center mx-auto pb-5" style={{ maxWidth: '600px' }}>
          <h5 className="text-primary">Our Blog</h5>
          <h1>Latest Blog & News</h1>
        </div>
        <div className="row g-5 justify-content-center">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-lg-6 col-xl-4">
              <div className="blog-item position-relative bg-light rounded">
                <img src={blog.image} className="img-fluid w-100 rounded-top" alt="" />
                <span
                  className="position-absolute px-4 py-3 bg-primary text-white rounded"
                  style={{ top: '-28px', right: '20px' }}
                >
                  {blog.tag}
                </span>
                <div
                  className="blog-btn d-flex justify-content-between position-relative px-3"
                  style={{ marginTop: '-75px' }}
                >
                  <div className="blog-icon btn btn-secondary px-3 py-2 rounded-pill my-auto">
                  <Link to={`/BlogPage/${blog.id}`} className="btn text-white">
  Read More
</Link>
                  </div>
                  <div className="blog-btn-icon btn btn-secondary px-3 py-2 rounded-pill my-auto">
                    <div className="blog-icon-1">
                      <p className="text-white px-2">
                        Share<i className="fa fa-arrow-right ms-3"></i>
                      </p>
                    </div>
                    <div className="blog-icon-2">
                      <a href="#" className="btn me-1">
                        <i className="fab fa-facebook-f text-white"></i>
                      </a>
                      <a href="#" className="btn me-1">
                        <i className="fab fa-twitter text-white"></i>
                      </a>
                      <a href="#" className="btn me-1">
                        <i className="fab fa-instagram text-white"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="blog-content text-center position-relative px-3"
                  style={{ marginTop: '-25px' }}
                >
                  <img
                    src={blog.authorImage}
                    className="img-fluid rounded-circle border border-4 border-white mb-3"
                    alt=""
                  />
                  <h5>{blog.author}</h5>
                  <span className="text-secondary">{blog.date}</span>
                  <p className="py-2">{blog.description}</p>
                </div>
                <div className="blog-coment d-flex justify-content-between px-4 py-2 border bg-primary rounded-bottom">
                  <a href="#" className="text-white">
                    <small>
                      <i className="fas fa-share me-2 text-secondary"></i>
                      {blog.shares} Share
                    </small>
                  </a>
                  <a href="#" className="text-white">
                    <small>
                      <i className="fa fa-comments me-2 text-secondary"></i>
                      {blog.comments} Comments
                    </small>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
