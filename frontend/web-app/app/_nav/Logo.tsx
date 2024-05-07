'use client';

import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineCar } from 'react-icons/ai';

import { useParamsStore } from '@/hooks/useParamsStore';

const Logo = () => {
  const reset = useParamsStore((state) => state.reset);

  const router = useRouter();
  const pathname = usePathname();

  const doReset = () => {
    if (pathname !== '/') router.push('/');

    reset();
  };

  return (
    <div
      onClick={doReset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
      <AiOutlineCar size={35} />
      <div>Carsties Auctions</div>
    </div>
  );
};

export default Logo;
