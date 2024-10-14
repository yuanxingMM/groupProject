'use client';

import { useState, useEffect, Suspense } from 'react';
import fetchApi from '../../utils/fetchUtil';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    
    const queryToken = searchParams.get('token');
    const queryEmail = searchParams.get('email');

    if (queryToken && queryEmail) {
      setToken(queryToken);
      setEmail(queryEmail);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    }

    if (!token || !email) {
      return setMessage('Invalid or missing token');
    }

    setIsSending(true);
    try {
      const res = await fetchApi(`/api/register/reset-password`, {
        method: 'POST',
        body: { email, token, password }
      });
      setIsSending(false);

      if (res.ok) {
        alert(res.data.message);
        
        router.push('/login');
      } else {
        setMessage(res.data.message || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Server error');
    }
  };

  if (!token || !email || isSending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Reset Password</h2>
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
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};


const ResetPasswordPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPassword />
  </Suspense>
);

export default ResetPasswordPage;