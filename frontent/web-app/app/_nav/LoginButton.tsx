'use client';

import { signIn } from 'next-auth/react';
import { Button } from 'flowbite-react';

const LoginButton = () => {
  return (
    <Button outline onClick={() => signIn('id-server', { callbackUrl: '/' }, { prompt: 'login' })}>
      Login
    </Button>
  );
};

export default LoginButton;
