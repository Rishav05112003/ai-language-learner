import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <header className="w-full fixed z-100 bg-white">
      <nav className="navbar bg-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            
            {/* <SignedOut>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content border-2 bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a href="#whyus">Why us?</a>
                </li>
                <li>
                  <a href="#products">Our Products</a>
                  <ul className="p-2">
                    <li>
                      <a> Mr. Lingo </a>
                    </li>
                    <li>
                      <a>Ai Quiz</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Prices</a>
                </li>
              </ul>
            </SignedOut> */}
            <SignedIn>
            <div
              tabIndex={0}
              role="button"
              className="btn ml-2 bg-white rounded-3xl border-0 text-black lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            </SignedIn>
            <SignedIn>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content border-2 bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/mrlingo">Mr. Lingo</Link>
                </li>
                <li>
                  <Link href="/test">Tests</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                
              </ul>
            </SignedIn>
          </div>
          <Link href="/">
            <h1 className="text-black pl-3  text-4xl font-bold ">Lingo<span className="text-green-600">AI</span></h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          
          <SignedIn>
            <ul className="menu bg-white  menu-horizontal px-1">
              <li className="btn mr-3 bg-white rounded-2xl border-0 text-black">
                <Link href="/mrlingo">Mr. Lingo</Link>
              </li>
              <li className="btn bg-white mr-3 rounded-3xl border-0 text-black ">
                <Link href="/test">Tests</Link>
              </li>
              <li className="btn bg-white mr-3 rounded-3xl border-0 text-black ">
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </SignedIn>
        </div>
        <div className="navbar-end">
          {/**signed in or out content */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-15 h-15",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="btn bg-white rounded-xl border-0 text-black">
                Sign In
              </button>
            </SignInButton>
            {/**<SignUpButton>
              <button className="btn bg-white rounded-xl text-gray-400 border-0">
                Sign up
              </button>
            </SignUpButton>*/}
          </SignedOut>
        </div>
      </nav>
    </header>
  );
};

export default Header;
