'use client';
import { useState } from 'react';
import fetchApi from '../../utils/fetchUtil';
import LoadingComponent from '../component/shopping/LoadingComponent';
import { toast } from 'react-toastify';
const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const res = await fetchApi('/api/register', { method: 'POST', body: { username, email, password } })
        setIsLoading(false);
        if (res.ok) {
           toast.success(res.data.message)
        } else {
           toast.info(res.data.message);
        }
    };
    if (isLoading) {
        return (<LoadingComponent />)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="userName" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="邮箱" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" />
            <button type="submit">注册</button>
        </form>
    );
};

export default Register;