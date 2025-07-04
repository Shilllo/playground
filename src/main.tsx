import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PrivyProvider } from '@privy-io/react-auth';
import './index.css';
import splashIcon from './assets/splash-icon.png';

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
                    accentColor: '#CDFB52',
                    logo: splashIcon,
                    loginMessage:
                        'Log in with the same social sign-in used for connecting to WEWE.',
                },
                loginMethods: ['email', 'google', 'apple', 'twitter'],
            }}
        >
            <App />
        </PrivyProvider>
    </StrictMode>,
);
