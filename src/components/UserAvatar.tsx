import { useSolanaWallets } from '@privy-io/react-auth';
import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';

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

function truncateAddress(
    address: string | undefined,
    startLength: number = 4,
    endLength: number = 4,
): string | undefined {
    if (!address) return;
    if (address.length <= startLength + endLength) {
        return address;
    }

    const start = address.slice(0, startLength);
    const end = address.slice(-endLength);

    return `${start}...${end}`;
}

export const UserAvatar = ({ userData }: { userData?: IUser | null }) => {
    const { wallets } = useSolanaWallets();
    const walletAddress = useMemo(() => {
        if (wallets) {
            return wallets[0]?.address;
        }
    }, [wallets]);

    const blockieAvatar = useMemo(() => {
        if (walletAddress) {
            return makeBlockie(walletAddress);
        }
    }, [walletAddress]);
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '12px',
            }}
        >
            <div
                style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    width: '75px',
                    height: '75px',
                }}
            >
                <img
                    src={userData?.avatarUrl || blockieAvatar}
                    alt="warning"
                    width={75}
                    height={75}
                />
            </div>

            <div
                style={{
                    color: 'rgba(248, 248, 248, 1)',
                    fontFamily: 'Geist-bold, sans-serif',
                }}
            >
                {userData?.username}
            </div>

            <div
                style={{
                    color: 'rgba(248, 248, 248, 0.64)',
                    fontFamily: 'Geist-bold, sans-serif',
                    fontSize: '14px',
                }}
            >
                {truncateAddress(walletAddress)}
            </div>
        </div>
    );
};
