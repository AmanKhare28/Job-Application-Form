import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Success from "./success";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
