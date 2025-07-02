import { ExportWalletButton } from './ExportWalletButton.tsx';

function App() {
    return (
        <div
            style={{
                backgroundColor: 'rgba(26, 26, 26, 1)',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: '16px',
                paddingLeft: '16px',
            }}
        >
            <ExportWalletButton />
        </div>
    );
}

export default App;
