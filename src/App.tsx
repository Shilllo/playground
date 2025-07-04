import { ExportWalletButton } from './components/ExportWalletButton.tsx';

function App() {
    return (
        <div
            style={{
                backgroundColor: 'rgba(26, 26, 26, 1)',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ExportWalletButton />
        </div>
    );
}

export default App;
