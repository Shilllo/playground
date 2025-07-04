import { useSolanaWallets } from '@privy-io/react-auth';
import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';

import { truncateAddress } from '../utils/truncateAddress';
import type { IUser } from '../types/user';

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

    const imageSource = useMemo(() => {
        return userData?.avatarUrl || blockieAvatar;
    }, [blockieAvatar, userData]);

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
                <img src={imageSource} alt="warning" width={75} height={75} />
            </div>

            {userData?.username && (
                <div
                    style={{
                        color: 'rgba(248, 248, 248, 1)',
                        fontFamily: 'Geist-bold, sans-serif',
                    }}
                >
                    {userData?.username}
                </div>
            )}

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
