import {  RouterProvider } from "react-router-dom";
import routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
 

  return (
    <div>
        
       <RouterProvider router={routes} />
       <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
