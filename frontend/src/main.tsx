import '@/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from './router';
import { RecoilRoot } from 'recoil';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </StrictMode>,
);
