'use client'

import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };


  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* White Box Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12 w-full h-[90vh] max-w-5xl">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <Image
          src="/logo.jpg"
          alt="Hobbify logo"
          width={360/2}
          height={76/2}
          priority
          className="mt-[-150px]" // Moves the logo up by 150px
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Start by loging into or creating an account for{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              Hobbify.tech
            </code>
          </li>
          <li className="tracking-[-.01em]">
            Find new hobbies based on your interests, powered by AI
          </li>
        </ol>

        {/* copilot */}
        {/* Username Input Box */}

        <div className="log-in-line-container font-[family-name:var(--font-geist-mono)]">
          <p className="text-m"> Account ID: &nbsp;</p>
          <input
            type="text"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter your ID"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto font-[family-name:var(--font-geist-mono)]"
          />
          <a
            className={`rounded-full border border-solid border-black/[.08] dark:border-grey/[.145] transition-colors flex items-center justify-center ${
              username
                ? "hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent hover:text-white"
                : "opacity-50 cursor-not-allowed"
            } font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto`}
            href={username ? "http://localhost:3000/profile" : "#"}
            target={username ? "_blank" : undefined}
            rel={username ? "noopener noreferrer" : undefined}
          >
            Log In
          </a>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/signup"
          >
            Sign Up
            <Image
              className="dark:invert"
              src="/signup-icon.png"
              alt="Sign Up icon"
              width={20}
              height={20}
            />
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
      <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about_us"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          About Us
        </a>
      </footer>
    </div>
    </div>
  );
}
