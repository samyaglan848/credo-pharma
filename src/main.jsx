import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CredoConfigProvider } from './context/CredoConfigContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CredoConfigProvider>
        <App />
      </CredoConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

