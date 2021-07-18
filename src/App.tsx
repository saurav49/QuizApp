import React, { useEffect } from "react";
import { Navbar, Quiz } from "./components/index";
import axios from "axios";
import "./App.css";

function App() {
  useEffect(() => {
    (async function () {
      const {
        data: { quizzes },
      } = await axios.get(`https://quizBackend.saurav49.repl.co/quiz`);
      console.log(quizzes);
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
