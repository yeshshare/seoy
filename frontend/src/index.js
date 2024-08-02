import React from 'react';
import ReactDOM from 'react-dom/client'; // Import correto do createRoot
import App from './App';
import { AuthProvider } from './contexts/authContext';

// Certifique-se de que o elemento root está presente no HTML
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <AuthProvider>
                <App />
            </AuthProvider>
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}