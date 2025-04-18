
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  favoriteItem: string;
  menuItem: {
    name: string;
    description: string;
    price_small?: number;
    price_large?: number;
  };
}

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const savedInfo = localStorage.getItem('userInfo');
    if (savedInfo) {
      setUserInfo(JSON.parse(savedInfo));
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6DC] to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#7D2E2E] mb-4">Not Signed Up Yet.</h1>
          <Link
            to="/sign-up"
            className="text-[#7D2E2E] hover:text-[#6D1E1E] underline text-lg"
          >
            Sign up Now!
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6DC] to-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-[#7D2E2E] mb-8 text-center">My Information</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#7D2E2E] mb-4">Personal Details</h2>
            <p><span className="font-medium">Name:</span> {userInfo.firstName} {userInfo.lastName}</p>
            <p><span className="font-medium">Email:</span> {userInfo.email}</p>
            <p><span className="font-medium">Phone:</span> {userInfo.phone}</p>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-2xl font-semibold text-[#7D2E2E] mb-4">Favorite Menu Item</h2>
            <p className="text-xl font-medium">{userInfo.menuItem.name}</p>
            <p className="text-gray-600 mt-2">{userInfo.menuItem.description}</p>
            <div className="mt-2 text-[#D4AF37]">
              {userInfo.menuItem.price_small && (
                <span>Small: ${userInfo.menuItem.price_small.toFixed(2)}</span>
              )}
              {userInfo.menuItem.price_large && (
                <span className="ml-4">Large: ${userInfo.menuItem.price_large.toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
