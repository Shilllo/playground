import { ExportWallet } from './components/ExportWallet.tsx';

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
            <ExportWallet />
        </div>
    );
}

export default App;
