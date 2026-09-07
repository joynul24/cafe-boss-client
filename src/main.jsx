import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { Router } from './Routes/Router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <HelmetProvider>
    <RouterProvider router={Router} />
    </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
