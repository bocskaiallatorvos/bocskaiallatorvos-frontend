import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CmsProvider } from "./context/CmsContext";
import MetaFetcher from './context/MetaFetcher.tsx';
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MetaFetcher />
    <HelmetProvider>
      <CmsProvider>
        <App />
      </CmsProvider>
    </HelmetProvider>
  </StrictMode>
);
