'use client';
import { useState } from 'react';
import fetchApi from '../../utils/fetchUtil';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsSending(true);
        e.preventDefault();
        try {
            const res = await fetchApi(`/api/register/forgot-password`, { method: 'POST', body: { email } });
            setIsSending(false);
            if (res.ok) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            setMessage(error);
        }
    };
    if (isSending) {
        return <>Sending...</>
    }

    return (
        <div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;