"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AboutUs() {
  const router = useRouter(); // Initialize the router

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)] p-8">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl text-center">
        <h1 className="text-3xl font-[family-name:var(--font-geist-mono)] font-bold mb-4 text-gray-800">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We are four Northwestern University students passionate about building innovative solutions to make life more enjoyable and meaningful.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col items-center">
            <Image
              src="/eiko.jpg"
              alt="Eiko Reisz"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
            <h2 className="text-xl font-[family-name:var(--font-geist-mono)] font-semibold text-gray-800">
              Eiko Reisz
            </h2>
            <p className="text-sm text-gray-600">Backend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/connor.jpg"
              alt="Connor King"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
            <h2 className="text-xl font-[family-name:var(--font-geist-mono)] font-semibold text-gray-800">
              Connor King
            </h2>
            <p className="text-sm text-gray-600">Backend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/samuel.jpg"
              alt="Samuel Grayson"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
            <h2 className="text-xl font-[family-name:var(--font-geist-mono)] font-semibold text-gray-800">
              Samuel Grayson
            </h2>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/jeri.jpg"
              alt="Jeri Huang"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
            <h2 className="text-xl font-[family-name:var(--font-geist-mono)] font-semibold text-gray-800">
              Jeri Huang
            </h2>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>
        </div>
        <button
          onClick={() => router.back()} // Navigate back to the previous page
          className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>
    </div>
  );
}
