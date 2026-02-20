import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./components/Button.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { getLocalProfile } from "./lib/localProfile.js";

const Logo = () => (
    <div className="group flex items-center space-x-3">
        <svg
            className="w-8 h-8 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: 'rgb(79, 70, 229)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgb(56, 189, 248)', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5V4.5A2.5 2.5 0 0 1 6.5 2z"
                stroke="url(#logo-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
             <path
                d="M9 7h6"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
             <path
                d="M9 11h6"
                stroke="url(#logo-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
        <span className="text-xl font-black tracking-tight text-slate-800">
          EduGuard AI
        </span>
    </div>
);

const NavLinks = ({ mobile = false, onNavigate }) => {
  const linkClass =
    "group relative font-semibold text-gray-600 hover:text-indigo-600 transition-all";
  const activeLinkClass = "text-indigo-600";
  const mobileLinkClass = "block py-2 text-2xl";

  const links = [
    { to: "/", text: "Home" },
    { to: "/features", text: "Features" },
    { to: "/how-it-works", text: "How It Works" },
    { to: "/pricing", text: "Pricing" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <nav className={mobile ? "space-y-4" : "hidden md:flex items-center space-x-8"}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeLinkClass : ""} ${
              mobile
                ? mobileLinkClass
                : "px-3 py-2 rounded-full hover:bg-white/70 backdrop-blur-sm"
            }`
          }
          onClick={onNavigate}
        >
          {link.text}
          {!mobile && (
            <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />
          )}
        </NavLink>
      ))}
    </nav>
  );
};


export default function Header() {
  const navigate = useNavigate();
  const { user, signOut, getDashboardPath } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const localProfile = getLocalProfile(user?.id);
  const displayName =
    localProfile?.fullName || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";
  const shortName =
    displayName.length > 16 ? `${displayName.slice(0, 13)}...` : displayName;
  const avatarUrl = localProfile?.avatarUrl || user?.user_metadata?.avatar_url || "";
  const shortEmail = user?.email
    ? user.email.length > 26
      ? `${user.email.slice(0, 23)}...`
      : user.email
    : "";

  const handleGetStarted = () => {
    navigate("/login");
    closeMenu();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    setIsLoggingOut(false);
    navigate("/");
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_12px_30px_-12px_rgba(15,23,42,0.35)] border-b border-white/40"
            : "bg-transparent"
        }`}
      >
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-indigo-100/30 via-white/20 to-cyan-100/30" />
        </div>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" onClick={closeMenu}><Logo /></NavLink>
            <NavLinks onNavigate={closeMenu} />
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <NavLink
                    to={getDashboardPath()}
                    className="flex items-center gap-3 rounded-full px-3 py-1.5 bg-white/70 hover:bg-white transition"
                  >
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-100"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold text-sm">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-slate-800 max-w-[130px] truncate">{shortName}</p>
                      <p className="text-xs text-slate-500 max-w-[130px] truncate">{shortEmail}</p>
                    </div>
                  </NavLink>
                  <NavLink to="/profile/edit" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
                    Edit Profile
                  </NavLink>
                  <Button
                    variant="outline"
                    className="py-2.5 px-5 bg-white/70"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors">Login</NavLink>
                  <Button
                    variant="primary"
                    className="py-2.5 px-5 shadow-[0_10px_24px_-10px_rgba(79,70,229,0.8)] hover:-translate-y-0.5 transition-transform"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-800 p-2 rounded-xl bg-white/70 backdrop-blur-md shadow-sm hover:shadow-md transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-gradient-to-br from-white to-indigo-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-500 md:hidden`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <NavLinks mobile={true} onNavigate={closeMenu} />
          <div className="flex flex-col space-y-4 w-full items-center px-8">
            {user ? (
              <>
                <div className="w-full flex items-center gap-3 text-sm text-slate-600 bg-white/70 rounded-2xl px-4 py-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{displayName}</p>
                    <p className="text-xs truncate">{shortEmail}</p>
                  </div>
                </div>
                <NavLink onClick={closeMenu} to={getDashboardPath()} className="w-full text-center text-lg font-semibold text-gray-700 hover:text-indigo-700">
                  Dashboard
                </NavLink>
                <NavLink onClick={closeMenu} to="/profile/edit" className="w-full text-center text-lg font-semibold text-gray-700 hover:text-indigo-700">
                  Edit Profile
                </NavLink>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <NavLink onClick={closeMenu} to="/login" className="w-full text-center text-lg font-semibold text-gray-600 hover:text-indigo-600">Login</NavLink>
                <Button variant="primary" className="w-full" onClick={handleGetStarted}>Get Started</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
