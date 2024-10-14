'use client';
import { useState } from 'react';
import fetchApi from '../../utils/fetchUtil';
import { useRouter } from 'next/navigation';
import LoadingComponent from '../component/shopping/LoadingComponent';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';


const Login = () => {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetchApi('/api/login', { method: 'POST', body: { email, password } })
        if (response.ok) {
            
            login(response.data.token, response.data.userId);
            toast.success(response.data.message);
            router.push('/');
        } else {
            
            if (response.status === 403 && response.data.isVerified === false) {
                toast.info(response.data.message);
            } else {
                toast.warn(response.data.message || 'Login failed. Please try again.');
            }
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (<LoadingComponent />)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="邮箱" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="密码" />
            <button type="submit">login</button>
        </form>
    );
};

export default Login;