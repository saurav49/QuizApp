import { Navbar, Question } from "./components/index";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  PrivateRoute,
  Login,
  SignUp,
  UserPage,
  Result,
} from "./pages/index";
import { InitializeUserData, InitializeData } from "./utils";

function App() {
  InitializeData();
  InitializeUserData();

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <PrivateRoute path="/question" element={<Question />} />
        <PrivateRoute path="/user" element={<UserPage />} />
        <PrivateRoute path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
