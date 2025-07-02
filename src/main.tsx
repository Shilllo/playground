import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrivyProvider } from '@privy-io/react-auth';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <PrivyProvider
            appId="cm8q965ko017kn99mm4z3p7qj"
            config={{
                embeddedWallets: {
                    solana: { createOnLogin: 'users-without-wallets' },
                },
                appearance: {
                    theme: 'dark',
                },
            }}
        >
            <App />
        </PrivyProvider>
    </StrictMode>,
);
