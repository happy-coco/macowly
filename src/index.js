import React from 'react';
//import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

