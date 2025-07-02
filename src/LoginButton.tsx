import { useLogin, usePrivy } from '@privy-io/react-auth';

export function LoginButton() {
    const { ready, authenticated } = usePrivy();
    const { login } = useLogin();

    const disableLogin = !ready || (ready && authenticated);

    return !disableLogin && <button onClick={login}>Log in</button>;
}
