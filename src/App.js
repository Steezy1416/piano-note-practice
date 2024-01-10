import LandingPage from "./Pages/LandingPage";
import PianoContainer from "./components/PianoContainer/PianoContainer";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "piano",
    element: <PianoContainer />,
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
