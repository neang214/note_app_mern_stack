import { useEffect } from "react";
import { User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
  const { checkAuth, authUser, logOut } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-0 mb-6">
      <div className="flex items-center">
        {/* Small Logo or App Name */}
        <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-violet-600">
          Vault
        </span>
      </div>

      <div className="flex items-center space-x-3">
        {authUser? (
          <>
            <span className="text-sm text-gray-300">{authUser?.fullName}</span>
            <button
              className="p-2 rounded-full bg-gray-800 hover:bg-violet-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="User Profile"
            >
              <User className="text-white" />
            </button>
            <button onClick={logOut}
              className="p-2 rounded-full bg-gray-800 hover:bg-violet-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
              aria-label="User Profile"
            >
              <LogOut className="text-rose-500" />
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-400">Please Log In or Sign Up to continue.</span>
        )}
      </div>

    </nav>
  );
};

export default NavBar
