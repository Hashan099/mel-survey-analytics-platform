"use client";
import React, { useState } from "react";
import { useAuth } from "../../../../Contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import LoadingSpinner from "../../Utils/LoadingSpinner";

const Navbar = () => {
  const [showMobileMenu, setMobileMenu] = useState(false);
  const [showUserMenu, setuserMenu] = useState(false);
  const [isSigningout, setIsSigningOut] = useState(false);
  const { user, loading, setIsServerValidated, logout } = useAuth();
  const router = useRouter();

  // toggle Mobile nav menu
  const toggleMobileDropdown = () => {
    setMobileMenu(!showMobileMenu);
  };

  // toggle users  menu
  const toggleUserDropdown = () => {
    setuserMenu(!showUserMenu);
  };

  // handle sign out
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await logout();
      setIsServerValidated(false);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) return null;
  if (isSigningout) return <LoadingSpinner message="Signing out ..." />;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto px-6 py-3.5">
        <Link href="/" className="flex flex-col text-left">
          <span className="text-xl md:text-2xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400">
            MEL — NLD
          </span>
          <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide">
            National Languages Division • Ministry of Public Administration, Sri Lanka
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* user menu */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <button
              onClick={toggleUserDropdown}
              type="button"
              className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-secondary dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <FaUserCircle size={"2rem"} />
            </button>
            {user && user?.emailVerified && (
              <div className="pl-1">
                <MdVerifiedUser color="green" size={"1.4rem"} />
              </div>
            )}
            {/* <!-- Dropdown menu --> */}
            <div
              className={`absolute top-10 right-0 mt-2 w-48 -z-50 ${
                showUserMenu ? "block" : "hidden"
              } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {/*  {currentUser.name} */}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {" "}
                  {user?.email}{" "}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                {/* <li>
                  <Link
                    href="/auth/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    create account
                  </Link>
                </li> */}
                {/*  <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
            </li> */}
                <li>
                  <a
                    onClick={handleSignOut}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={toggleMobileDropdown}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={showMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            showMobileMenu ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/survey"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Survey
              </Link>
            </li>
            <li>
              <Link
                href="/survey/surveyAnalytics"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Visual Analytics
              </Link>
            </li>
            <li>
              <Link
                href="/survey/tabulator"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Data Table
              </Link>
            </li>
            <li>
              <Link
                href="/survey/editor"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                aria-current="page"
              >
                Survey Editor
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
