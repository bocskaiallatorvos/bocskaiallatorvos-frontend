import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CmsProvider } from "./context/CmsContext";
import MetaFetcher from './context/MetaFetcher.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MetaFetcher />
    <CmsProvider>
      <App />
    </CmsProvider>
  </StrictMode>
);
