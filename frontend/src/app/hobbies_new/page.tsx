"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [hobbies, setHobbies] = useState([
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
  const [error, setError] = useState("");
  const [userID, setUserID] = useState<string | null>(null); // State to store the userID
const [addedHobbies, setAddedHobbies] = useState<boolean[]>([]); // State to track added hobbies

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIDFromURL = new URL(window.location.href).searchParams.get("userID");
        setUserID(userIDFromURL); // Save userID for use in URLs

        const response = await fetch("http://127.0.0.1:5000/createHobbies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: { $oid: userIDFromURL },
          }),
        });

        const data = await response.json();

        if (response.ok) {
          const hobbyData = data.map((hobby: any) => ({
            title: hobby.activity,
            description: hobby.description,
            cost: hobby.budget,
            time: hobby.time,
          }));
          setHobbies(hobbyData);
setAddedHobbies(new Array(hobbyData.length).fill(false)); // Initialize addedHobbies state
        } else {
          setError(data.message || "Failed to load hobbies.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false); // Set loading to false after fetching is complete
      }
    };

    fetchData();
  }, []);

  const handleCreateTask = (key: number) => {
    const fetchData = async () => {
      try {
        const userIDFromURL = new URL(window.location.href).searchParams.get("userID");
        setUserID(userIDFromURL); // Save userID for use in URLs

        const response = await fetch("http://127.0.0.1:5000/createTasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: { $oid: userIDFromURL },

            hobby: {
              activity: hobbies[key].title,
              description: hobbies[key].description,
              time: hobbies[key].time,
              budget: hobbies[key].cost, // Fixed the budget field to use the correct property
            },
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Task created successfully:", data);
          const updatedAddedHobbies = [...addedHobbies];
          updatedAddedHobbies[key] = true; // Mark the hobby as added
          setAddedHobbies(updatedAddedHobbies);
        } else {
          setError(data.message || "Failed to create hobby.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchData();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-[1250px] mx-auto">
        {/* Main Content */}
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">
          Discover New Hobbies
        </h1>

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 items-center flex-wrap mb-6">
          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/hobbies?userID=${userID}`}
          >
            Hobbies
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/tasks?userID=${userID}`}
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
            href={`/signup?userID=${userID}`}
          >
            Profile
          </a>
        </div>

        {/* Loading Warning */}
        {loading && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-6 text-center">
            Loading hobbies, please wait...
          </div>
        )}

        {/* Hobby Cards */}
        {!loading && (
          <div className="flex flex-col gap-6 w-full">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col items-start w-full"
              >
                <p className="text-lg font-semibold mb-2">{hobby.title}</p>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 font-bold">
                    Description:
                  </label>
                  <p className="text-sm">{hobby.description}</p>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 font-bold">
                    Cost:
                  </label>
                  <p className="text-sm">{hobby.cost}</p>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 font-bold">
                    Time:
                  </label>
                  <p className="text-sm">{hobby.time}</p>
                </div>
                <div className="flex items-center">
                  <a
                    className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
                    onClick={() => handleCreateTask(index)} // Pass the index to the function
                  >
                    Add
                  </a>
                  {addedHobbies[index] && (
                    <span className="ml-2 text-green-500 font-bold">✔</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-center gap-4 items-center flex-wrap mt-6">
        <a
          className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
          href={`/tasks?userID=${userID}`}
          style={{ backgroundColor: "#db4d3a", color: "white" }}
        >
          See Tasks
        </a>
        <a
          className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
          href={`/hobbies_new?userID=${userID}`}
        >
          Refresh All
        </a>
      </div>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href={`/about_us?userID=${userID}`}
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