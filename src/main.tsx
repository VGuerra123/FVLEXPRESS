import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import { Marketplace } from './pages/Marketplace.tsx';
import { CategoryPage } from './pages/CategoryPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:categoryId" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
