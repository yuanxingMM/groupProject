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
                                <form action="sign-in" method="POST" onSubmit={handleSubmit}>
                                    <div className="d-flex flex-column justify-content-center p-3 mt-3 h-100">
                                        <div className="row justify-content-center mt-2">
                                            <label>修改密碼</label>
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
                                            <button type="submit" className="col-12 btn btn-danger">修改密码</button>
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
        </div>
    );
};

export default Page;