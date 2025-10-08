import { Link2 } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';

const UserProfile = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className='flex bg-amber-50 sticky top-0 z-50 shadow-md p-3'>
        <Link 
          to={"/user/profile/orderSummary"} 
          className="flex items-center gap-2 font-semibold text-gray-800 hover:text-amber-600"
        >
          <Link2 /> OrderSummary
        </Link>
      </nav>

      {/* Content */}
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfile;
