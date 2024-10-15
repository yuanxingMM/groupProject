'use client';

import { useState, useEffect, Suspense } from 'react';
import fetchApi from '../../utils/fetchUtil';
import { useRouter, useSearchParams } from 'next/navigation';
import Script from "next/script";
import './localstyles.css';
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
    <>
      <main className="container h-100 ps-0 pt-0 pe-0 pb-0">
        <div className="row h-100 p-0">
          <header className="col-12 order-first align-content-center">
            <div className="d-flex flex-row justify-content-between ps-2 pe-2">
              <div className="d-flex flex-row justify-content-start">
                <span id="blink1">小崗村生活雜貨 </span><span id="blink2">生</span><span id="blink3">活</span><span id="blink4">美</span><span id="blink5">好</span>
              </div>
              <div >
                <a id="back-to-main" href="/" className="btn bg-info  me-1" role="button">返回主頁</a>
                <a id="help" href="help" className="btn bg-info-subtle" role="button">協助</a>
              </div>
            </div>
          </header>
          <div id="stuff" className="col-12">
            <div className="d-flex flex-row justify-content-center h-100 p-0">
              <article className="col-sm-6">
                <form action="" method="POST" onSubmit={handleSubmit}>
                  <div className="d-flex flex-column justify-content-center p-3 mt-3 h-100">
                    <div className="row justify-content-center mt-2">
                      <label>重新設定密碼</label>
                    </div>
                    <div className="row mt-2">

                      <input className="d-block w-100" type='password' name="password" placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    </div>
                    <div className="row mt-2">

                      <input className="d-block w-100" type='password' name="password" placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required />
                    </div>
                    <div className="row mt-3">
                      <button type="submit" className="col-12 btn btn-danger">Reset Password</button>
                    </div>
                  </div>
                </form>
              </article>
            </div>
          </div>
          {/* <footer className="col-12 order-last align-content-center p-0">
            <div className="d-flex justify-content-between ps-2 pe-4">
              <span>我是footer</span>
            </div>
          </footer> */}
        </div>
      </main>
      <Script src="/scripts/bootstrap.js" strategy="beforeInteractive" />
    </>
  );
};


const ResetPasswordPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResetPassword />
  </Suspense>
);

export default ResetPasswordPage;