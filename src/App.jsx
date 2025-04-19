import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/View/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/components/Css/index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
