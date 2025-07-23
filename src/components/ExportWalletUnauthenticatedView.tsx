import { useLogin } from '@privy-io/react-auth';
import { CalloutIcon } from './icons/CalloutIcon';

export const ExportWalletUnauthenticatedView = () => {
    const { login } = useLogin();
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
                fontFamily: 'Geist-Bold, sans-serif',
            }}
        >
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
                    }}
                >
                    <CalloutIcon />
                </div>
                <div
                    style={{
                        color: '#F8F8F8',
                        letterSpacing: '-0.03em',
                        fontSize: '24px',
                    }}
                >
                    Export WEWE Wallet
                </div>
                <div
                    style={{
                        color: '#F8F8F8A3',
                        fontSize: '16px',
                        width: '100%',
                        textAlign: 'center',
                        lineHeight: '1.6',
                    }}
                >
                    You must securely log in to your account again to export
                    your wallet.
                </div>
            </div>
            <button
                style={{
                    backgroundColor: 'rgba(248, 248, 248, 1)',
                    color: 'rgba(15, 15, 15, 1)',
                    border: '1px solid rgba(248, 248, 248, 0.1)',
                    borderRadius: '40px',
                    padding: '12px 16px',
                    width: '100%',
                    fontWeight: 500,
                    fontSize: '16px',
                    marginBottom: '12px',
                }}
                onClick={login}
            >
                Log in to сontinue
            </button>
        </div>
    );
};
