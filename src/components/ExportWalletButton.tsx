import {
    useLogin,
    usePrivy,
    type WalletWithMetadata,
} from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';
import { useCallback, useEffect, useState } from 'react';
import { UserAvatar } from './UserAvatar.tsx';

export interface IUser {
    username?: string;
    bio?: string | null;
    avatarUrl?: string | null;
    createdDate?: string;
    socialLinks?: {
        twitter?: string | null;
        instagram?: string | null;
        youtube?: string | null;
        tiktok?: string | null;
    };
}

export function ExportWalletButton() {
    const { ready, authenticated, user, logout, getAccessToken } = usePrivy();
    const { exportWallet } = useSolanaWallets();
    const { login } = useLogin();
    const isAuthenticated = ready && authenticated;
    const [userData, setUserData] = useState<IUser | null>();

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
            {ready && !authenticated && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 32,
                    }}
                >
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            backgroundColor: '#FFB53229',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 100,
                            marginTop: '32px',
                        }}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 10.9999C17.2652 10.9999 17.5196 11.1053 17.7071 11.2928C17.8946 11.4803 18 11.7347 18 11.9999V15.9999C18 16.5303 17.7893 17.039 17.4142 17.4141C17.0391 17.7892 16.5304 17.9999 16 17.9999H2C1.46957 17.9999 0.960859 17.7892 0.585786 17.4141C0.210714 17.039 0 16.5303 0 15.9999V11.9999C0 11.7347 0.105357 11.4803 0.292893 11.2928C0.48043 11.1053 0.734784 10.9999 1 10.9999C1.26522 10.9999 1.51957 11.1053 1.70711 11.2928C1.89464 11.4803 2 11.7347 2 11.9999V15.9999H16V11.9999C16 11.7347 16.1054 11.4803 16.2929 11.2928C16.4804 11.1053 16.7348 10.9999 17 10.9999ZM9.884 0.473899L13.95 4.5399C14.0455 4.63215 14.1217 4.74249 14.1741 4.86449C14.2265 4.9865 14.2541 5.11772 14.2553 5.2505C14.2564 5.38328 14.2311 5.51496 14.1808 5.63785C14.1305 5.76075 14.0563 5.8724 13.9624 5.96629C13.8685 6.06019 13.7568 6.13444 13.634 6.18472C13.5111 6.235 13.3794 6.2603 13.2466 6.25915C13.1138 6.258 12.9826 6.23041 12.8606 6.178C12.7386 6.12559 12.6282 6.04941 12.536 5.9539L10 3.4199V11.9999C10 12.2651 9.89464 12.5195 9.70711 12.707C9.51957 12.8945 9.26522 12.9999 9 12.9999C8.73478 12.9999 8.48043 12.8945 8.29289 12.707C8.10536 12.5195 8 12.2651 8 11.9999V3.4189L5.464 5.9539C5.2754 6.13606 5.0228 6.23685 4.7606 6.23457C4.4984 6.2323 4.24759 6.12713 4.06218 5.94172C3.87677 5.75631 3.7716 5.5055 3.76933 5.2433C3.76705 4.9811 3.86784 4.7285 4.05 4.5399L8.116 0.473899C8.23208 0.357791 8.36989 0.265687 8.52157 0.202848C8.67325 0.140009 8.83582 0.107666 9 0.107666C9.16418 0.107666 9.32675 0.140009 9.47843 0.202848C9.63011 0.265687 9.76792 0.357791 9.884 0.473899Z"
                                fill="#FFB532"
                            />
                        </svg>
                    </div>
                    <div
                        style={{
                            fontFamily: 'Geist-bold, sans-serif',
                            color: '#F8F8F8',
                            letterSpacing: '-0.03em',
                            fontSize: '24px',
                        }}
                    >
                        Export WEWE Wallet
                    </div>
                    <div
                        style={{
                            fontFamily: 'Geist-bold, sans-serif',
                            color: '#F8F8F8A3',
                            fontSize: '16px',
                            width: '80%',
                            textAlign: 'center',
                            lineHeight: '1.6',
                        }}
                    >
                        You must securely log in to your account again to export
                        your wallet.
                    </div>
                </div>
            )}
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
                        marginBottom: '12px',
                    }}
                    onClick={login}
                >
                    Log in to сontinue
                </button>
            )}
            {isAuthenticated && (
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
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.4108 2.80799L21.1888 10.586C21.3746 10.7717 21.522 10.9922 21.6226 11.2349C21.7231 11.4776 21.7749 11.7378 21.7749 12.0005C21.7749 12.2632 21.7231 12.5233 21.6226 12.766C21.522 13.0087 21.3746 13.2293 21.1888 13.415L13.4108 21.193C13.0358 21.5679 12.5272 21.7786 11.9968 21.7786C11.4665 21.7786 10.9579 21.5679 10.5828 21.193L2.80482 13.415C2.61902 13.2293 2.47163 13.0087 2.37107 12.766C2.27051 12.5233 2.21875 12.2632 2.21875 12.0005C2.21875 11.7378 2.27051 11.4776 2.37107 11.2349C2.47163 10.9922 2.61902 10.7717 2.80482 10.586L10.5828 2.80799C10.9579 2.43304 11.4665 2.22241 11.9968 2.22241C12.5272 2.22241 13.0358 2.43304 13.4108 2.80799ZM11.9968 4.22199L4.21882 12L11.9968 19.78L19.7748 12L11.9968 4.22199ZM11.9988 15C12.2537 15.0003 12.4989 15.0979 12.6842 15.2728C12.8695 15.4478 12.9811 15.6869 12.996 15.9414C13.0109 16.1958 12.9281 16.4464 12.7646 16.6418C12.601 16.8373 12.3689 16.9629 12.1158 16.993L11.9988 17C11.7438 17.0002 11.4983 16.903 11.3125 16.7282C11.1268 16.5534 11.0149 16.3142 10.9997 16.0596C10.9845 15.805 11.0672 15.5542 11.2308 15.3585C11.3944 15.1629 11.6266 15.0371 11.8798 15.007L11.9988 15ZM11.9968 7.99998C12.8638 7.99998 13.5348 8.75998 13.4268 9.61998L12.9888 13.124C12.9581 13.3654 12.8404 13.5873 12.6578 13.7482C12.4752 13.909 12.2402 13.9977 11.9968 13.9977C11.7535 13.9977 11.5185 13.909 11.3359 13.7482C11.1532 13.5873 11.0355 13.3654 11.0048 13.124L10.5668 9.61998C10.5413 9.41718 10.5592 9.21126 10.6194 9.01591C10.6796 8.82057 10.7807 8.64028 10.916 8.48703C11.0512 8.33378 11.2176 8.21109 11.4039 8.12711C11.5903 8.04314 11.7924 7.9998 11.9968 7.99998Z"
                                fill="#FE515A"
                            />
                        </svg>
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
                            onClick={logout}
                            disabled={!isAuthenticated || !embeddedWallet}
                            style={{
                                backgroundColor: 'rgba(15, 15, 15, 1)',
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
            )}
        </div>
    );
}
