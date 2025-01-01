'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Button } from './ui/button';

export const LoginButton = () => {
  const session = useSession();
  if (!session || session.status === 'unauthenticated') {
    return (
      <Button variant={'secondary'} style={{ marginRight: 10 }} onClick={() => signIn()}>
        Sign in
      </Button>
    );
  }
  return (
    <Button variant={'secondary'} style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
