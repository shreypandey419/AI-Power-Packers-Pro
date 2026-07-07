import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  UserPlus,
} from "lucide-react";
import { useRef } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const customer =
    JSON.parse(localStorage.getItem("customer")) ||
    JSON.parse(localStorage.getItem("user"));

  const isLoggedIn =
    !!localStorage.getItem("customerToken") && !!customer;

  const logout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Do you really want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "auto";
  }, [open]);

  useEffect(() => {
    const close = (e) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", close);

    return () =>
      document.removeEventListener("mousedown", close);
  }, []);

  const navLink =
    "relative hover:text-blue-600 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-600 hover:after:w-full after:transition-all after:duration-300";

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-blue-600"
        >
          Packers<span className="text-orange-500">Pro</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-semibold">
          <NavLink to="/" className={navLink}>
            Home
          </NavLink>

          <NavLink to="/about" className={navLink}>
            About
          </NavLink>

          <NavLink to="/services" className={navLink}>
            Services
          </NavLink>

          <NavLink to="/contact" className={navLink}>
            Contact
          </NavLink>
        </div>

        {/* Right Buttons */}
        <div className="hidden lg:flex items-center gap-3">

          {!isLoggedIn ? (
            <>
              <Link
                to="/signin"
                className="flex items-center gap-2 border border-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
              >
                <User size={18} />
                Sign In
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition shadow-lg"
              >
                <UserPlus size={18} />
                Sign Up
              </Link>
            </>
          ) : (
            <>

              <div className="relative" ref={profileRef}>

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 border px-4 py-2 rounded-xl hover:bg-gray-100"
                >
                  <User size={18} />
                  {customer?.name?.split(" ")[0]}
                  ▼
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border overflow-hidden">

                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/my-bookings"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Bookings
                    </Link>

                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>
            </>
          )}

          {!isLoggedIn && (
            <Link
              to="/admin/login"
              className="border border-purple-600 text-purple-600 px-4 py-2 rounded-xl hover:bg-purple-600 hover:text-white transition"
            >
              Admin
            </Link>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="lg:hidden bg-white shadow-xl px-6 py-6">

          <div className="flex flex-col space-y-4 font-semibold">

            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>

            <NavLink to="/services" onClick={() => setOpen(false)}>
              Services
            </NavLink>

            <NavLink to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavLink>

          </div>

          <hr className="my-5"/>

          {!isLoggedIn ? (
            <div className="space-y-3">

              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block text-center border py-3 rounded-xl"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block text-center bg-blue-600 text-white py-3 rounded-xl"
              >
                Sign Up
              </Link>

              <Link
                to="/admin/login"
                onClick={() => setOpen(false)}
                className="block text-center border border-purple-600 text-purple-600 py-3 rounded-xl"
              >
                Admin Login
              </Link>

            </div>
          ) : (
            <div className="space-y-3">

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                My Profile
              </Link>

              <Link
                to="/my-bookings"
                onClick={() => setOpen(false)}
                className="block py-2"
              >
                My Bookings
              </Link>

              <button
                onClick={logout}
                className="w-full bg-red-600 text-white py-3 rounded-xl"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      )}
    </nav>
  );
}
