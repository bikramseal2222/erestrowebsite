import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import "./App.css";
import "./assets/css/style.css";
import "./assets/js/custom";
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Suspense
        fallback={
          <div className="loader">
            <BeatLoader className="inner_loader" />
          </div>
        }
      >
        <Router />
      </Suspense>
    </div>
  );
}

export default App;
