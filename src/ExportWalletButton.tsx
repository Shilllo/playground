import {
    useLogin,
    usePrivy,
    type WalletWithMetadata,
} from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useCallback, useEffect, useRef } from 'react';

export function ExportWalletButton() {
    const { ready, authenticated, user, logout } = usePrivy();
    const { exportWallet } = useSolanaWallets();
    const { login } = useLogin();
    const isAuthenticated = ready && authenticated;
    const loginCalled = useRef(false);

    const embeddedWallet = user?.linkedAccounts.find(
        (account): account is WalletWithMetadata =>
            account.type === 'wallet' &&
            account.walletClientType === 'privy' &&
            account.chainType === 'solana',
    );

    const handleExport = useCallback(async () => {
        if (embeddedWallet?.address) {
            await exportWallet({ address: embeddedWallet.address });
        } else {
            console.warn('No valid embedded wallet address found.');
        }
    }, [embeddedWallet, exportWallet]);

    useEffect(() => {
        if (!loginCalled.current && ready && !authenticated) {
            loginCalled.current = true;
            login();
        }
    }, [ready, authenticated, login]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            logout();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [logout]);

    return (
        <div
            style={{
                width: '100%',
                gap: '16px',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: '16px',
            }}
        >
            {ready && !authenticated && (
                <button
                    style={{
                        backgroundColor: 'rgba(248, 248, 248, 1)',
                        color: 'rgba(15, 15, 15, 1)',
                        border: '1px solid rgba(248, 248, 248, 0.1)',
                        borderRadius: '40px',
                        padding: '12px 16px',
                        width: '100%',
                        fontFamily: 'Geist-Bold, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px',
                    }}
                    onClick={login}
                >
                    Log in
                </button>
            )}
            {isAuthenticated && (
                <button
                    onClick={handleExport}
                    disabled={!isAuthenticated || !embeddedWallet}
                    style={{
                        backgroundColor: 'rgba(248, 248, 248, 1)',
                        color: 'rgba(15, 15, 15, 1)',
                        border: '1px solid rgba(248, 248, 248, 0.1)',
                        borderRadius: '40px',
                        padding: '12px 16px',
                        width: '100%',
                        fontFamily: 'Geist-Bold, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px',
                    }}
                >
                    Show Private Key
                </button>
            )}
        </div>
    );
}
