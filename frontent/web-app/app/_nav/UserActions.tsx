'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { User } from 'next-auth';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiUser } from 'react-icons/hi2';
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai';

type Props = {
  user: Partial<User>;
};

const UserActions = ({ user }: Props) => {
  return (
    <Dropdown label={`Welcome ${user.name}`} inline>
      <Dropdown.Item icon={HiUser}>
        <Link href="/">My Auctions</Link>
      </Dropdown.Item>

      <Dropdown.Item icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
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
