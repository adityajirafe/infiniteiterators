import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Page from './components/Page'

const Home = React.lazy(() => import("./pages/home/"));

function App() {
  return (
    <BrowserRouter>
      <React.Suspense>
        <Routes>
          <Route
            exact={true}
            path="/home"
            element={<Page component={<Home />} title="Home page" />}
          />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;