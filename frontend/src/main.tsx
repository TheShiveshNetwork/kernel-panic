import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import  Router  from '@/router/index';
import { RecoilRoot } from 'recoil';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  </StrictMode>,
);
