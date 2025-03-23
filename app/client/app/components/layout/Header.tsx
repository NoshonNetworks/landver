import { Menu, LogOut, User } from "lucide-react";
import { useAppContext } from "@/app/context/appContext";
import { useState, useRef, useEffect } from "react";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { disconnectWallet, balance, status } = useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the profile menu to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      {/* Left Section: Hamburger (Mobile) */}
      <button className="md:hidden p-2" onClick={toggleSidebar}>
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Center: Search Bar */}
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      {/* Right Section: Wallet & Profile */}
      <div className="flex items-center space-x-4">
        {/* Balance */}
        {status === "connected" ? (
          <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
            <img
              src="/icons/currencies/ether.svg"
              alt="ETH"
              className="w-4 h-4"
            />
            <span className="text-gray-700 font-medium">
              {balance || "0.00 ETH"}
            </span>
          </div>
        ) : (
          <button className="bg-primary text-white p-2 rounded">
            Connect Wallet
          </button>
        )}

        {/* Profile Avatar with Popup Menu */}
        <div className="relative" ref={profileMenuRef}>
          <div
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer"
            onClick={toggleProfileMenu}
          >
            <span className="text-sm text-gray-600"></span>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  setShowProfileMenu(false);
                }}
              >
                <User size={16} className="mr-2" />
                Profile
              </button>
              <button
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  disconnectWallet();
                  setShowProfileMenu(false);
                }}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
