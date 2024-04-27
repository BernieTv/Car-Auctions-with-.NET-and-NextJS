import Logo from './Logo';
import Search from './Search';
import LoginButton from './LoginButton';
import { getCurrentUser } from '../_actions/authActions';
import UserActions from './UserActions';

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
};

export default Navbar;
