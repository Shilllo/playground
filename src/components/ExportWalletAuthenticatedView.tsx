import { usePrivy, type WalletWithMetadata } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import type { IUser } from '../types/user';
import { UserAvatar } from './UserAvatar';
import { WarningIcon } from './icons/WarningIcon';

declare global {
    interface Window {
        ReactNativeWebView?: {
            postMessage: (message: string) => void;
        };
    }
}

export const ExportWalletAuthenticatedView = ({
    handleExport,
}: {
    handleExport: () => void;
}) => {
    const { getAccessToken, ready, authenticated, user, logout } = usePrivy();
    const [userData, setUserData] = useState<IUser | null>();
    const isAuthenticated = ready && authenticated;

    const embeddedWallet = user?.linkedAccounts.find(
        (account): account is WalletWithMetadata =>
            account.type === 'wallet' &&
            account.walletClientType === 'privy' &&
            account.chainType === 'solana',
    );

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                const token = await getAccessToken();
                const res = await fetch(
                    'https://api-gateway.staging.mywewe.click/api/users/me/profile',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                const data = await res.json();
                setUserData(data.data);
            })();
        }
    }, [isAuthenticated, getAccessToken]);

    const handleCloseWebView = () => {
        logout();
        window.ReactNativeWebView?.postMessage('close');
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                gap: '35px',
            }}
        >
            <div
                style={{
                    backgroundColor: '#FE515A1A',
                    borderRadius: '8px',
                    display: 'flex',
                    gap: '5px',
                    alignItems: 'center',
                    padding: '12px',
                }}
            >
                <WarningIcon />
                <div
                    style={{
                        color: '#E4DFDA',
                        textDecoration: 'underline',
                        fontFamily: 'Geist-Bold, sans-serif',
                        fontSize: '14px',
                    }}
                >
                    Never{' '}
                </div>
                <div
                    style={{
                        color: '#E4DFDA',
                        fontFamily: 'Geist-Bold, sans-serif',
                        fontSize: '14px',
                    }}
                >
                    share your Private Key with anyone.
                </div>
            </div>

            <UserAvatar userData={userData} />

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
                    Export Privy Wallet
                </button>
                <button
                    onClick={handleCloseWebView}
                    disabled={!isAuthenticated || !embeddedWallet}
                    style={{
                        backgroundColor: 'transparent',
                        color: 'rgba(248, 248, 248, 1)',
                        border: '1px solid rgba(248, 248, 248, 0.1)',
                        borderRadius: '40px',
                        padding: '12px 16px',
                        width: '100%',
                        fontFamily: 'Geist-Bold, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px',
                    }}
                >
                    Log out of Export Wallet
                </button>
            </div>
        </div>
    );
};
