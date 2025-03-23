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
    <header className="w-full fixed ">
      {/**navbar 2 design testing */}
      <nav className="navbar bg-white shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
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
            <SignedOut>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content border-2 bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Why us?</a>
                </li>
                <li>
                  <a>Our Products</a>
                  <ul className="p-2">
                    <li>
                      <a> Product 1</a>
                    </li>
                    <li>
                      <a>Product 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Prices</a>
                </li>
              </ul>
            </SignedOut>
            <SignedIn>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content border-2 bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/mrlingo">Mr. Lingo</Link>
                </li>
                <li>
                  <a>Tests</a>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                
              </ul>
            </SignedIn>
          </div>
          <Link href="/">
            <Image
              src="/lingoAi.png"
              alt="logo"
              width={200}
              height={200}
              className="h-12 py-1 w-auto ml-5 object-contain"
            ></Image>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <SignedOut>
            <ul className="menu bg-white  menu-horizontal px-1">
              <li className="btn bg-white mr-3 rounded-3xl border-0 text-black ">
                <a>Why us?</a>
              </li>
              <li>
                <details>
                  <summary className="btn  bg-white rounded-2xl border-0 text-black">
                    Our Products
                  </summary>
                  <ul className="p-2 bg-white">
                    <li>
                      <a>Product 1</a>
                    </li>
                    <li>
                      <a>Product 2</a>
                    </li>
                  </ul>
                </details>
              </li>
              <li className="btn ml-3 bg-white rounded-2xl border-0 text-black">
                <a>Prices</a>
              </li>
            </ul>
          </SignedOut>
          <SignedIn>
            <ul className="menu bg-white  menu-horizontal px-1">
              <li className="btn mr-3 bg-white rounded-2xl border-0 text-black">
                <Link href="/mrlingo">Mr. Lingo</Link>
              </li>
              <li className="btn bg-white mr-3 rounded-3xl border-0 text-black ">
                <a>Tests</a>
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
