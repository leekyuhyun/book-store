import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import App from './App.tsx'

async function mountApp() {
    if (import.meta.env.DEV) {
        const { worker } = await import("./mock/browser");
        await worker.start({ onUnhandledRequest: 'bypass' });
    }

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <App />
        </StrictMode>
    )
}

mountApp()