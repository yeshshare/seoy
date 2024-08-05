import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correto do createRoot
import App from './App';

// Certifique-se de que o elemento root está presente no HTML
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(

        <App />

    );
} else {
    console.error('Root element not found');
}