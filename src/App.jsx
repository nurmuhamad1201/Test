import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/home/home";
 
import GetbyId from "./pages/getById/getbyId";
 
const App = () => {
  const router = createBrowserRouter([
 
    {
      path: "/",
      element:  <Layout /> ,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home/:id",
          element: <GetbyId />
        }
  
      ]
    }
  ]);
  
  return (
    <RouterProvider router={router}></RouterProvider>
   
  );
};

export default App;
