"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userId = localStorage.getItem("userId");
      const otp = localStorage.getItem("otp");

      setLoggedIn(userId !== null && otp !== null);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("otp");

    setLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="bg-gradient-to-r from-pink-200 to-pink-300 shadow-lg py-5">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-extrabold tracking-wide text-white transition-all duration-300  hover:text-fuchsia-500">
          Julias Bank
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/">
                <span className="text-white  hover:text-fuchsia-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
                  Hem
                </span>
              </Link>
            </li>

            {loggedIn && (
              <li>
                <Link href="/account">
                  <span className="text-white hover:text-fuchsia-500  cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
                    Konto
                  </span>
                </Link>
              </li>
            )}

            {!loggedIn ? (
              <>
                <li>
                  <Link href="/login">
                    <span className="text-white  hover:text-fuchsia-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
                      Logga in
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <span className="text-white  hover:text-fuchsia-500 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105">
                      Skapa användare
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className=" text-white hover:text-fuchsia-500  cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Logga ut
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
