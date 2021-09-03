import { Navbar, Question } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { Home, PrivateRoute, Login, SignUp } from "./pages/index";
import { InitializeData } from "./utils";

function App() {
  InitializeData();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <PrivateRoute isLogin={true} path="/question" element={<Question />} />
      </Routes>
    </div>
  );
}

export default App;
