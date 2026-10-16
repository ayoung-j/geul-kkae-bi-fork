import { Metadata } from 'next';
import SignUpForm from '../_components/SignUpForm';
import { fetchCurrentUser } from '@/utils/auth/server-action';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입',
};

const SignUpPage = async () => {
  const user = await fetchCurrentUser();

  if (user?.id) {
    redirect('/');
  }

  return (
    <div className='container py-[3.125rem] max-md:pt-[0.875rem]'>
      <h2 className='body-32 text-gray-700 mb-[0.625rem] max-md:hidden'>회원가입</h2>
      <hr className='border-t-2 border-gray-500 mb-10 max-md:hidden' />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
