import logo from '@/assets/top.png'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow-md">
      <nav className="flex justify-center items-center h-[70px] sm:h-[80px]">
        <div className="flex items-center w-[90%] max-w-[1200px] justify-between px-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-8 sm:h-12 sm:w-12 object-cover rounded-xl shadow-sm"
            />
            <h1 className="text-gray-800 text-lg sm:text-2xl font-bold tracking-tight">
              Dashboard
            </h1>
          </div>

          {/* Signout Button */}
          <button
            onClick={() => {
                logout();
                navigate("/signin")
            }}
            className="relative overflow-hidden px-4 py-2 sm:px-6 sm:py-2 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
          >
            <span className="relative z-10">Sign out</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
