import React from 'react';
import ReactDOM from 'react-dom/client';
import { Future } from '@remix-run/router';
import App from './App';
import './index.css';

// React Router future flags
Future.v7_startTransition = true;
Future.v7_relativeSplatPath = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 