# Codebase Analysis Report: All-Score-100

## 1. Project Overview
- **Project Name:** All-Score-100
- **Purpose:** An e-learning web application designed to provide students with structured study materials, video lectures, and mock tests.
- **Business Domain:** Education / EdTech.
- **Core Features:**
  - User Authentication (Login/Register).
  - Course and Subject Discovery.
  - Chapter-wise notes (PDF Viewer).
  - Video Lecture integration.
  - Mock Tests and Result tracking.
  - Admin panel for course management.
- **User Roles:**
  - **Student:** Can browse courses, view contents, take tests, and see results.
  - **Admin:** Can add and manage courses, subjects, topics, and videos.
- **Technology Stack:**
  - **Frontend:** React (v18), JavaScript.
  - **Styling:** Bootstrap 5, CSS3, Material UI (MUI), Framer Motion, AOS (Animations).
  - **Routing:** React Router DOM (v6).
  - **API Client:** Axios & Fetch API.
  - **Visualization:** Recharts (for results/analytics), Generic Carousel (Owl Carousel).
  - **PDF Handling:** @react-pdf-viewer/core, @react-pdf/renderer.
  - **Backend (Inferred):** .NET Core (running on localhost:7010).

---

## 2. Folder Structure Analysis
| Folder | Purpose |
|:---|:---|
| `src/assets` | Static assets like CSS files (bootstrap, common styles) and images. |
| `src/components` | Reusable UI components and feature-specific modules. |
| `src/components/Admin` | Modules for administrative tasks (e.g., adding courses). |
| `src/components/AuthTabs` | Authentication components (Login/Register tabs). |
| `src/components/LandingPage` | Root component for the home page. |
| `src/components/PDF` | PDF viewing logic and styles. |
| `src/components/Tables` | Flexible table components for displaying chapter/topic data. |
| `src/Pages` | High-level page components that represent different routes. |
| `src/Services` | API communication layer using Axios/Fetch. |

---

## 3. File-by-File Analysis

### Root Files
- **`src/index.js`**: Application entry point. Initializes React root and renders `<App />`.
- **`src/App.js`**: Main application component that provides the `RouterProvider` with the defined routes.
- **`src/Routes.js`**: Configuration file for all application routes using `createBrowserRouter`.
- **`src/reportWebVitals.js`**: Standard utility for measuring app performance.

### Pages (`src/Pages`)
- **`MainLayout.jsx`**: Shared layout containing the `Navbar`, `Outlet` (for content), and `Footer`.
- **`AboutPage.jsx`**: Displays company/platform information.
- **`ConTactPage.jsx`**: Contact form and support information.
- **`OurBlog.jsx`**: List of educational blogs or news.
- **`OurTeam.jsx`**: Profiles of teachers or team members.
- **`OurTestimonial.jsx`**: Student feedback display.
- **`ResultPage.jsx`**: Visual representation of test results.
- **`VideosPage.jsx`**: Interface for browsing and watching video lectures.
- **`BlogPage/BlogPage.jsx`**: Dynamic page for viewing a single blog post.

### Components (`src/components`)
- **`LandingPage/index.jsx`**: Orchestrates several homepage sections.
- **`AuthTabs/AuthTabs.jsx`**: Handles the toggle between Login and Registration forms.
- **`Admin/Course/AddCourse.jsx`**: Complex form for admins to build course hierarchies.
- **`subjects/Subjects.js`**: Displays available courses and their options (e.g., 11th, 12th).
- **`Tables/SingleTable.js`**: Fetches and displays topics for a selected subject option.
- **`Tables/CustomTable.js`**: A generic table component for listing topics with action buttons.
- **`PDF/PdfReader.jsx`**: Integrated PDF viewer for reading notes.
- **`MokTest/MockTest.jsx`**: Interface for interactive testing.
- **`PieChart/PieChart.jsx`**: Data visualization component using Recharts.

### Services (`src/Services`)
- **`authService.js`**: Handles `login` and `register` API calls.
- **`courseService.js`**: Fetches course details and subjects.
- **`contentService.js`**: Fetches chapter-wise topics and PDF paths.
- **`blogService.js`**: Fetches blog content.
- **`commonService.js`**: Fetches global data like "Facts" for the landing page.

---

## 4. Routing Analysis
The application uses **React Router DOM v6** with a nested strategy:
- `/` (Root): `AuthTabs` (Entry).
- `/home`: Homepage (Index).
- `/about`, `/contact`, `/our-team`, `/testimonials`, `/blogs`: Informational pages.
- `/blog/:blogId`: Dynamic blog view.
- `/courses/:courseId/subjects`: Subject selection for a course.
- `/courses/:courseId/chapters`: List of topics for a subject option.
- `/pdf/:optionTopicId/:srNo`: PDF Notes viewer.
- `/videos`: Video library.
- `/mock-test/:testId`: Interactive test.
- `/result`: Test statistics.
- `/admin/add-course`: Admin dashboard for content creation.

---

## 5. Component Hierarchy
1.  **App**
    - **RouterProvider (routes)**
        - **AuthTabs** (Public)
        - **MainLayout** (Wrapped)
            - **Navbar**
            - **Outlet** (Displays `Index`, `AboutPage`, `Subjects`, `SingleTable`, etc.)
            - **Footer**
        - **AddCourse** (Admin)

---

## 6. State Management
- **Local State:** Heavily used via `useState` and `useEffect` for data fetching and UI toggles (e.g., `activeTab` in `AuthTabs`).
- **Route State:** Used `useLocation().state` to pass `optionId` between `Subjects` and `SingleTable` pages.
- **State Flow:** Data flows from services to components, then down to sub-components via props (e.g., `CustomTable` receiving `data`).

---

## 7. API Analysis
- **Base URL:** `https://localhost:7010/api`
- **Endpoints:**
  - `/auth/login`, `/auth/register`
  - `/Common/courses`, `/Common/facts`
  - `/Courses/coursesDetails/{id}`
  - `/Content/by-option/{id}`
  - `/Content/LecturePdf/{optionTopicId}/{srNo}`
- **Error Handling:** Centralized in services using `try-catch` blocks and reported to users via `react-toastify`.

---

## 8. Authentication & Authorization
- **Flow:** User registers → Logs in → Token received (assumed) → Redirected to `/home`.
- **Security:**
  - Token handling is minimal in frontend code (likely stored in local storage, though missing explicit implementation in `authService.js`).
  - Route protection is currently flat; any user can navigate to `/admin/add-course` if they know the URL (potential security issue).

---

## 9. Business Flow
1.  **Auth Journey:** Welcome Screen (AuthTabs) → Login → Landing Page.
2.  **Learning Journey:** Home → Select Course (Services) → Choose Class (11th/12th in Subjects) → View Index (SingleTable) → Open Notes (PdfReader) or Video.
3.  **Assessment Journey:** Take Mock Test → Submit → Result Page (Charts).

---

## 10. Architecture Analysis
### Strengths
- **Modular components:** Easy to maintain and reuse.
- **Service Layer:** Clear separation of API logic from UI components.
- **Modern UI:** Use of animations (AOS) and responsive layouts (Bootstrap).

### Weaknesses & Scalability Concerns
- **Lack of Global State:** As the app grows, passing state via routing or props will become cumbersome; consider Redux or Context API.
- **Flat Security:** Admin routes are not protected by a Higher-Order Component (HOC) or Guard.
- **Hardcoded URLs:** Backend URLs are repeated in multiple services instead of using an environment variable or Axios instance.
- **Prop Drilling:** Potential in large nested components like `AddCourse`.

---
**Report generated by Antigravity AI.**
