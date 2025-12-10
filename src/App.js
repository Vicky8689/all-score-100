import {  RouterProvider } from "react-router-dom";
import routes from "./Routes";
const App = () => {
 

  return (
    <div>
        
       <RouterProvider router={routes} />
    </div>
  );
};

export default App;
