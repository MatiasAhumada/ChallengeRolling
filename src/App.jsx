import { Route, Router, Routes } from "react-router-dom";
import Home from "./components/View/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
    </Routes>
  );
}

export default App;
