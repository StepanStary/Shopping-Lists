import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './components/i18n'; // Import konfigurace i18next
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<I18nextProvider i18n={i18n}>
  <React.StrictMode>
      <React.Suspense fallback="loading">
        <App />
      </React.Suspense>
  </React.StrictMode>,
    </I18nextProvider>
);

reportWebVitals();
