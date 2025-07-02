import {
    useLogin,
    usePrivy,
    type WalletWithMetadata,
} from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useCallback, useEffect, useRef } from 'react';

export function ExportWalletButton() {
    const { ready, authenticated, user } = usePrivy();
    const { exportWallet } = useSolanaWallets();
    const { login } = useLogin();
    const isAuthenticated = ready && authenticated;

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
        if (ready && !authenticated) {
            login();
        }
    }, [authenticated, ready, login]);

    return (
        <button
            onClick={handleExport}
            disabled={!isAuthenticated || !embeddedWallet}
            style={{
                backgroundColor: 'rgba(248, 248, 248, 1)',
                color: 'rgba(15, 15, 15, 1)',
                border: '1px solid rgba(248, 248, 248, 0.1)',
                borderRadius: '40px',
                padding: '8px 16px',
                width: '100%',
                fontFamily: 'Geist-Bold, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
            }}
        >
            Show Private Key
        </button>
    );
}
