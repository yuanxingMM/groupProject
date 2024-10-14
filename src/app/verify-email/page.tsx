'use client';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import fetchApi from '../../utils/fetchUtil';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const token = searchParams.get('token'); 

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        const response = await fetchApi(`/api/register/verify-email?token=${token}`);
        if (response.ok) {
          
          alert(response.data.message);
          
          router.push('/login');
        } else {
          
          alert(response.data.message);
        }
      }
    };

    verifyEmail();
  }, [router, token]);

  return <div>Verifying your email...</div>;
};


const verifyEmailPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Page />
  </Suspense>
);

export default verifyEmailPage;
