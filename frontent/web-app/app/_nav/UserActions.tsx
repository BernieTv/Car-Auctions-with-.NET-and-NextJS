'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { User } from 'next-auth';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiUser } from 'react-icons/hi2';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';

import { useParamsStore } from '@/hooks/useParamsStore';

type Props = {
  user: User;
};

const UserActions = ({ user }: Props) => {
  const setParams = useParamsStore((state) => state.setParams);

  const router = useRouter();
  const pathname = usePathname();

  const setWinner = () => {
    setParams({ winner: user.username, seller: undefined });

    if (pathname != '/') router.push('/');
  };

  const setSeller = () => {
    setParams({ seller: user.username, winner: undefined });

    if (pathname != '/') router.push('/');
  };

  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillTrophy} onClick={setWinner}>
        Auctions won
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillCar}>
        <Link href="/auctions/create">Sell my car</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (dev only)</Link>
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item icon={AiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
};

export default UserActions;
