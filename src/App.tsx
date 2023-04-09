import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";

import toastConfig from "./configs/toast-messages";

import Countries from "./modules/countries/components/Countries";

import "./App.css";

const App = () => {
  return (
    <div>
      <Countries />
      <ToastContainer {...(toastConfig as ToastContainerProps)} />
    </div>
  );
};

export default App;
