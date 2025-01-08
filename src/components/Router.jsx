import React from "react";
import Header from "./Header";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Reminders from "../pages/Reminders";

export default function Router() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/reminders" element={<Reminders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
