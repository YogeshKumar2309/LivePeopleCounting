import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from "react-router-dom";
import App from './App.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import AdminApp from './componets/AdminApp.jsx';

const Root = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return isAdminRoute ? <AdminApp /> : <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
);
