import { createBrowserRouter } from "react-router-dom";



import Index from "./components/LandingPage/index";
import Subjects from "./components/subjects/Subjects";
import SingleTable from "./components/Tables/SingleTable";


import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ConTactPage";

import OurBlog from "./Pages/OurBlog";
import BlogPage from "./Pages/BlogPage/BlogPage";

import OurTeam from "./Pages/OurTeam";
import OurTestimonial from "./Pages/OurTestimonial";

import VideoPage from "./Pages/VideosPage";
import AuthTabs from "./components/AuthTabs/AuthTabs";
import AddCourse from "./components/Admin/Course/AddCourse";
import AppShell from "./Pages/AppShell";
import MainLayout from "./Pages/MainLayout";
import PdfViewer from "./components/PDF/PdfReader";
import MockTestStartPage from "./Pages/MockTest/MockTestStartPage";
import MockTestPage from "./Pages/MockTest/MockTestPage";
import MockTestResultPage from "./Pages/MockTest/ResultPage";
import SolutionReviewPage from "./Pages/MockTest/SolutionReviewPage";
import CreateExam from "./components/Admin/Exame/CreateExam";
import CreateExamWord from "./components/Admin/Exame/CreateExamWord";
const routes = createBrowserRouter([
  {
    element: <AppShell />,
    children: [

  /* AUTH */
  {
    path: "/",
    element: <AuthTabs />,
  },

  /* MAIN WEBSITE LAYOUT */
  {
    element: <MainLayout />,

    children: [

      {
        path: "/home",
        element: <Index />,
      },

      {
        path: "/about",
        element: <AboutPage />,
      },

      {
        path: "/contact",
        element: <ContactPage />,
      },

      {
        path: "/our-team",
        element: <OurTeam />,
      },

      {
        path: "/testimonials",
        element: <OurTestimonial />,
      },

      {
        path: "/blogs",
        element: <OurBlog />,
      },

      {
        path: "/blog/:blogId",
        element: <BlogPage />,
      },

      {
        path: "/courses/:courseId/subjects",
        element: <Subjects />,
      },

      {
        path: "/courses/:courseId/chapters",
        element: <SingleTable />,
      },

      {
        path: "/pdf/:optionTopicId/:srNo",
        element: <PdfViewer />
      },

      {
        path: "/videos/:optionTopicId",
        element: <VideoPage />,
      },

      {
        path: "/mock-test/:testId",
        element: <MockTestStartPage />,
      },
      {
        path: "/mock-test/:testId/run",
        element: <MockTestPage />,
      },
      {
        path: "/mock-test/:testId/result/:attemptId",
        element: <MockTestResultPage />,
      },
      {
        path: "/mock-test/:testId/solutions",
        element: <SolutionReviewPage />,
      }


    ],
  },

  /* ADMIN */
  {
    path: "/admin/add-course",
    element: <AddCourse />,
  },
  {
        path: "admin/exams/create-from-excel",
        element: <CreateExam />,
  },
  {
        path: "admin/exams/create-from-word",
        element: <CreateExamWord />,
  }

    ],
  },
]);

export default routes;
