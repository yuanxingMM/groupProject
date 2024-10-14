'use client';
import { useState } from 'react';
import fetchApi from '../../utils/fetchUtil';
import './forgot password.css';
import { Button } from 'react-bootstrap';

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
        <div className="store">
            小崗村生活雜貨
            <div className="row">
                <h1>Forgot Password</h1>
                <h6 className="information-text">Enter your registered email to reset your password.</h6>
                <div className="form-group">
                    <form onSubmit={handleSubmit}>
                        <p><label htmlFor="username">Please provide your email address:</label></p>
                        <input type="email" name="user_email" id="user_email" placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </form>
                    <Button type="submit">Send Reset Password Link</Button>
                </div>
                <div className="footer">
                    <h5>New here? <a href="/register">Sign Up.</a></h5>
                    <h5>Already have an account? <a href="/login">Sign In.</a></h5>
                    <p className="information-text">
                        <span className="symbols" title="Lots of love from me to YOU!">&hearts; </span>
                        <a href="/contact" target="_blank" title="Connect me"><strong>Contact Us</strong></a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;