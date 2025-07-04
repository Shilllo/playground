import { usePrivy, type WalletWithMetadata } from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useCallback } from 'react';
import { ExportWalletUnauthenticatedView } from './ExportWalletUnauthenticatedView.tsx';
import { ExportWalletAuthenticatedView } from './ExportWalletAuthenticatedView.tsx';

export function ExportWallet() {
    const { ready, authenticated, user } = usePrivy();
    const { exportWallet } = useSolanaWallets();
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

    return (
        <div
            style={{
                display: 'flex',
                gap: 16,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
            }}
        >
            {ready && !authenticated && <ExportWalletUnauthenticatedView />}

            {isAuthenticated && (
                <ExportWalletAuthenticatedView handleExport={handleExport} />
            )}
        </div>
    );
}
