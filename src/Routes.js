import { createBrowserRouter } from "react-router-dom";
import PdfViewer from './components/PdfReader';
import Subjects from './components/subjects/Subjects';
import MngTable from './components/Tables/Table';
import SingleTable from './components/Tables/SingleTable';
import Index from './components/LandingPage/index';
import ContactPage from './Pages/ConTactPage';
import AboutPage from './Pages/AboutPage';
import OurBlog from './Pages/OurBlog';
import OurTestimonial from "./Pages/OurTestimonial";
import OurTeam from './Pages/OurTeam';
import VideoPage from './Pages/VideosPage';
import AuthTabs from "./components/AuthTabs/AuthTabs";
import BlogPage from "./Pages/BlogPage/BlogPage"
import AddCourse from "./components/Admin/Course/AddCourse";
const routes = createBrowserRouter([
  { path: "/home", element: <Index /> },
{ path: "/courses/:courseId/subjects", element: <Subjects /> },
  { path: "/tables", element: <MngTable /> },
  { path: "/table", element: <SingleTable /> },
  { path: "/pdf/:srNo", element: <PdfViewer /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/ourteam", element: <OurTeam /> },
  { path: "/ourtestimonial", element: <OurTestimonial /> },
  { path: "/ourblog", element: <OurBlog /> },
  { path: "/videos", element: <VideoPage /> },
  {path : "/" , element:<AuthTabs/>},
   {path:"/BlogPage/:blogId",element:<BlogPage/>},
   {path:"/Admin/AddCourse",element:<AddCourse/>}
]);

export default routes;
