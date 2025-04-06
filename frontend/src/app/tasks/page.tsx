"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { access } from "fs";

export default function Page() {
  const [tasks, setTasks] = useState([]); // State to store tasks fetched from the backend
  const [activities, setActivities] = useState<
    { activity: string; tasks: { label: string; completed: boolean }[] }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(""); // State to handle errors
  const [userID, setUserID] = useState<string | null>(null); // State to store the userID
  const tasksPerPage = 1;

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userIDFromURL = new URL(window.location.href).searchParams.get("userID");
        setUserID(userIDFromURL); // Save userID for use in URLs

        const response = await fetch("http://127.0.0.1:5000/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: { $oid: userIDFromURL },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();

        if (data.activeHobbies && Array.isArray(data.activeHobbies)) {
          const activityData = data.activeHobbies.map((hobby: any) => ({
            activity: hobby.activity,
            tasks: hobby.tasks.map((task: any) => ({
              label: task["task"] || "Task",
              completed: task["completed"] || false,
            })),
          }));
          setActivities(activityData);
        } else {
          throw new Error("Invalid tasks data format");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks. Please try again later.");
      }
    };

    fetchTasks();
  }, []);

   const toggleFieldCompletion = async (activityIndex: number, taskIndex: number) => {
    const globalActivityIndex = currentPage * tasksPerPage + activityIndex; // Adjust for the current page offset
    setActivities((prevActivities) =>
      prevActivities.map((activity, aIndex) =>
        aIndex === globalActivityIndex
          ? {
            ...activity,
            tasks: activity.tasks.map((task, tIndex) =>
              tIndex === taskIndex
                ? { ...task, completed: !task.completed }
                : task
            ),
          }
          : activity
      )
    );
    try {
      const userIDFromURL = new URL(window.location.href).searchParams.get("userID");
      setUserID(userIDFromURL); // Save userID for use in URLs


      const response = await fetch("http://127.0.0.1:5000/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: { $oid: userIDFromURL },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      
      console.log(data)
      data["activeHobbies"][globalActivityIndex]["tasks"][taskIndex]["completed"]= !data["activeHobbies"][globalActivityIndex]["tasks"][taskIndex]["completed"]
      console.log(data)
      const response2 = await fetch("http://127.0.0.1:5000/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: { $oid: userID },
          name: data.name,
          pastHobbies: data.pastHobbies,
          activeHobbies: data.activeHobbies,
          location: data.location,
          availability: data.availability,
          budget: data.budget,
          age: data.age
        }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data2 = await response.json();
    } catch (error) {
      //setError("Failed to update tasks. Please try again later.");
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tasksPerPage < activities.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleActivities = activities.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">
          Your Tasks
        </h1>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 items-center flex-wrap mb-6">
          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/hobbies?userID=${userID}`}
          >
            Hobbies
          </a>

          <button
            className="rounded-full border border-black px-4 py-2 text-black bg-gray-300 cursor-not-allowed"
            disabled
          >
            Tasks
          </button>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/hobbies_new?userID=${userID}`}
          >
            New Hobbies
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/signup?userID=${userID}`}
          >
            Profile
          </a>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg font-[family-name:var(--font-geist-mono)] font-medium mb-6">
          Manage your tasks and track your progress.
        </p>

        {/* Task Boxes */}
        <div className="flex flex-col gap-6 w-full">
          {visibleActivities.map((activity, activityIndex) => (
            <div
              key={activityIndex}
              className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col items-start w-full"
            >
              <p className="text-lg font-semibold mb-4">{activity.activity}</p>
              {activity.tasks && activity.tasks.length > 0 ? (
                activity.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleFieldCompletion(activityIndex, taskIndex)}
                      className="mr-3 w-5 h-5 rounded-full border-2 border-red-500 text-red-500 focus:ring-red-500"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {task.label || "Task"}
                      </label>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No tasks available</p>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${currentPage === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Show Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * tasksPerPage >= activities.length}
            className={`px-4 py-2 rounded ${(currentPage + 1) * tasksPerPage >= activities.length
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
          >
            Show More
          </button>
        </div>
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