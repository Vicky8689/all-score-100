import React from 'react';
import PdfViewer from './components/PdfReader';
import samplePdf from './sample.pdf'; 
import Subjects from './components/subjects/Subjects'
import  MngTable  from './components/Tables/Table';
import SingleTable from './components/Tables/SingleTable'
import {  createBrowserRouter,  RouterProvider,} from "react-router-dom";
const App = () => {

  //routing start 
  const router =createBrowserRouter(
    [
      {path:"/",
        // element:<Subjects/>
        
        element:<PdfViewer />
        // element:<Deflayout fileUrl={samplePdf}/>
      },
      {path:"/tables",
        element:<MngTable />,
      },
      {path:"/table",
        element:<SingleTable/>
      },
      {path:"/pdf",
        element:<PdfViewer />
      },
    ]
  );
  //routing end


  
  const pdfFileUrl = samplePdf;

  return (
    <div>
      {/* <h1>hello vicky</h1> */}
      <RouterProvider router={router} />
      {/* <h1>React PDF Viewer</h1> */}
      {/* <Subjects/> */}
      {/* <MngTable /> */}
      {/* <PdfViewer fileUrl={pdfFileUrl} /> */}
      
    </div>
  );
};

export default App;
