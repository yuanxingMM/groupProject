'use client';
import { useState, useEffect } from 'react';
import fetchApi from '../../utils/fetchUtil';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/dataUtils';

const Page = () => {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);


    const handleSubmit = async (e: React.FormEvent) => {
        let token = getToken();
        if (!token) {
            toast.warn('Please login first!');
            router.push('/login');
            return;
        }
        e.preventDefault();

        if (password !== confirmPassword) {
            return setMessage('Passwords do not match');
        }

        setIsSending(true);
        try {
            
               const res = await fetchApi(`/api/register/change-password`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: { password }
            });
            setIsSending(false);

            if (res.ok) {
                alert(res.data.message)
            } else {
                setMessage(res.data.message || 'Something went wrong');
            }
        } catch (error) {
            setMessage('Server error');
        }
    };

    if (isSending) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Page;