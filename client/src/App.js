import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../src/assets/pages/_components/header/header";
import Main from "../src/assets/pages/mainPage/mainPage";
import Footer from "./assets/pages/_components/footer/footer";
import Login from "./assets/pages/loginPage/loginPage";
import Client from "./assets/pages/clientPage/clientPage";
import Admin from "./assets/pages/adminPage/adminPage";
import AdminDeviceList from "./assets/pages/adminPage/adminDeviceList";
import AdminEventManager from "./assets/pages/adminPage/adminEventManager";
import Registration from "./assets/pages/registrationPage/registrationPage";
import Event from "./assets/pages/eventsPage/eventsPage";
import DevicePage from "./assets/pages/clientPage/devicePage";
import EventHistory from "./assets/pages/clientPage/clientEvent";
import ClientDocuments from "./assets/pages/clientPage/clientDocuments";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/event" element={<Event />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/client" element={<Client />} />
        <Route path="/Admin" element={<Admin />} />
        <Route
          path="/AdminDeviceList"
          element={<AdminDeviceList />}
        />
        <Route
          path="/AdminEvents"
          element={<AdminEventManager />}
        />

        <Route path="/DeviceList" element={<DevicePage />} />
        <Route path="/client/eventHistory" element={<EventHistory />} />
        <Route path="/client/Documents" element={<ClientDocuments />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
