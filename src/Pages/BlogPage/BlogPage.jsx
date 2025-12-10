import React from "react";
import GenericBlog from "../../components/Blog/Blogs/GenericBlog";
import Navbar from "../../components/NavBar/Navbar";
import "aos/dist/aos.css"; // Import AOS styles
import CustomCarousel from "../../components/CustomCarousel/CustomCarousel"

const postsData = [
  {
    id: 1,
    title: "Annual Day Celebration 2025 – A Day of Joy, Bonding & Memories",
    subtitle: "A relaxed, interactive celebration centered around students",
    date: "2025-03-20",
    location: "[Insert Hotel/Banquet Hall Name]",
    heroImage: "/images/annual-day.jpg",
    content: `Annual Day 2025 at [Coaching Class Name] was not just another formal event — it was an experience that celebrated togetherness, simplicity, and joy. This year, we stepped away from tradition, choosing not to include any speeches, lamp lighting, or cultural performances. Instead, we curated a celebration that was relaxed, interactive, and centered around our students — their laughter, friendships, and shared moments.

From a warm welcome area to fun-filled games like Academic Bingo, Pass the Message, and Quiz Battles, every activity encouraged bonding and participation. A photo booth captured candid moments, while a delicious meal brought everyone together to share stories and laughter.

Students described it as the best Annual Day so far — no pressure, just fun and friends.`,
    highlights: [
      "No formal speeches or performances",
      "Fun team games and activities",
      "Photo booth and candid photography",
      "Delicious group meal"
    ],
    gallery: ["img/blog-3.jpg", "img/blog-2.jpg" ,"img/blog-1.jpg"],
    video: "https://www.youtube.com/embed/sample",
    quotes: [
      "This was the best Annual Day so far — no pressure, just fun and friends!",
      "We didn’t even realize how time flew. It was so refreshing."
    ]
  },
  {
    id: 2,
    title: "A Heartwarming Birthday Celebration in the Classroom",
    subtitle: "Celebrating a student’s special day with love and simplicity",
    date: "2025-04-05",
    location: "[Coaching Class Name], [Branch or City]",
    heroImage: "/images/birthday.jpg",
    content: `At [Coaching Class Name], we value every student's presence beyond academics. Recently, we celebrated the birthday of [Student's Full Name] in a simple yet meaningful way — right inside the classroom.

The student arrived to find a decorated corner with balloons, a handmade poster, and friendly wishes on the whiteboard. After class, a cake-cutting ceremony was held, followed by light snacks and sweets. Friends shared thoughtful gestures like wish cards and sticky note messages.

The celebration was quiet, sweet, and full of love — proving that joy doesn’t always need to be loud.`,
    highlights: [
      "Minimal but heartfelt decorations",
      "Cake cutting in the classroom",
      "Snacks and casual conversations",
      "Thoughtful notes from classmates"
    ],
    gallery: ["img/blog-3.jpg", "img/blog-2.jpg"],
    video: "https://www.youtube.com/embed/sample2",
    quotes: [
      "This wasn’t a fancy party — but I felt so special.",
      "Even without games or music, we had the best time just being there for our friend."
    ]
  }
];

const BlogPage = () => {
  return (

    <div >
            <Navbar />
         {/* image */}
    
      <GenericBlog
        posts={postsData}
        title="Events & Celebrations"
        description="Capturing our most memorable moments at all scores 100"
      />
    </div>
  );
};

export default BlogPage;
