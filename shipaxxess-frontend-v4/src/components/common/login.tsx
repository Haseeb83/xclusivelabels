import { useState } from 'react';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFACode, setTwoFACode] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, twoFACode }),
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (data.token) {
            Cookies.set('authToken', data.token, { expires: 7 });
            // Redirect to dashboard
        }
    };

    return (
        <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" value={twoFACode} onChange={(e) => setTwoFACode(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
