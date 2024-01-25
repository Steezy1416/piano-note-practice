import LandingPage from "./Pages/LandingPage";
import PianoStaffContainer from "./components/PianoStaffContainer";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "piano",
    element: <PianoStaffContainer/>,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
