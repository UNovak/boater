import { RouterProvider } from "react-router-dom";
import { mainRouter } from "@utils/Routing";
import "./App.css";

const App = () => {
  return (
    <>
      <RouterProvider router={mainRouter} />
    </>
  );
};

export default App;
