import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenericBlog from "../../components/Blog/Blogs/GenericBlog";
import Navbar from "../../components/NavBar/Navbar";
import "aos/dist/aos.css";
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel";
import { GetBlogById } from "../../Services/blogService";

const BlogPage = () => {
  const { blogId } = useParams(); // ✅ inside component
  const [postsData, setPostsData] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await GetBlogById(blogId); 
        console.log(data.data);
        setPostsData(data.data); 
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    if (blogId) fetchBlog();
  }, [blogId]); 

  return (
    <div>
      {/* <Navbar /> */}

      <GenericBlog
        posts={postsData}
      />
    </div>
  );
};

export default BlogPage;