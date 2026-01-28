import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BookMeetPage } from "./pages/BookDemoPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-demo" element={<BookMeetPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
