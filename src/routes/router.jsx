import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
  {
    pathname: "/",
    element: <Main></Main>,
    children:[
      {
        path: "/",
        element: <Home></Home>
      }
    ]
  },
]);

export default router;