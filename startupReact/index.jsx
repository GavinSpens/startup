import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';
import { All_jsx } from './src/functions/all.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
document.addEventListener('DOMContentLoaded', () => {
    All_jsx();
});