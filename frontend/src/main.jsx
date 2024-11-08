import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext.jsx'; // Import UserContextProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider> {/* Wrap App with UserContextProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </StrictMode>,
);
