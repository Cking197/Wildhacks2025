"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [hobbies] = useState([
    {
      title: "",
      description: "",
      cost: "",
      time: "",
    },
    {
      title: "",
      description: "",
      cost: "",
      time: "",
    },
    {
      title: "",
      description: "",
      cost: "",
      time: "",
    },
  ]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">
          Discover New Hobbies
        </h1>

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 items-center flex-wrap mb-6">
          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="/hobbies"
          >
            Hobbies
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="/tasks"
          >
            Tasks
          </a>

          <button
            className="rounded-full border border-black px-4 py-2 text-black bg-gray-300 cursor-not-allowed"
            disabled
          >
            New Hobbies
          </button>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="/signup"
          >
            Profile
          </a>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg font-[family-name:var(--font-geist-mono)] font-medium mb-6">
          Add hobbies you would like to start to Tasks. Refresh to see three new hobbies.
        </p>

        {/* Hobby Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col items-start"
            >
              <p className="text-lg font-semibold mb-2">{hobby.title}</p>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description:
                </label>
                <p className="text-sm">{hobby.description}</p>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Cost:
                </label>
                <p className="text-sm">{hobby.cost}</p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Time:
                </label>
                <p className="text-sm">{hobby.time}</p>
              </div>
              <a
                className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
              >
                Add
              </a>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-center gap-4 items-center flex-wrap mt-6">
          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="/tasks"
            style={{ backgroundColor: "#db4d3a", color: "white" }}
          >
            See Tasks
          </a>
          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="/hobbies_new"
          >
            Refresh All
          </a>
        </div>
      </div>

      {/* Footer */}
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
  );
}