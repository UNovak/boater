import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./utils/Routers";
import "./App.css";

const App = () => {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
};

export default App;
