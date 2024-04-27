'use client';

import { signIn } from 'next-auth/react';
import { Button } from 'flowbite-react';

const LoginButton = () => {
  return (
    <Button outline onClick={() => signIn('id-server', { callbackUrl: '/' })}>
      Login
    </Button>
  );
};

export default LoginButton;
