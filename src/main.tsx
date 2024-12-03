import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { TutorialProvider } from './components/TutorialContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <TutorialProvider>
          <App />
        </TutorialProvider>
      </AuthProvider>
    </SupabaseProvider>
  </StrictMode>
);
