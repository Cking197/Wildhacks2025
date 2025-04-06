"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [tasks, setTasks] = useState([]); // State to store tasks fetched from the backend
  const [currentPage, setCurrentPage] = useState(0);
  const [error, setError] = useState(""); // State to handle errors
  const [userID, setUserID] = useState<string | null>(null); // State to store the userID
  const tasksPerPage = 3;

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userIDFromURL = new URL(window.location.href).searchParams.get("userID");
        setUserID(userIDFromURL); // Save userID for use in URLs

        const response = await fetch("http://127.0.0.1:5000/tasks"); // Replace with your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        if (data.tasks && Array.isArray(data.tasks)) {
          setTasks(data.tasks); // Assuming the backend returns an object with a `tasks` array
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

  const toggleFieldCompletion = (taskId: number, fieldIndex: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              fields: task.fields.map((field, index) =>
                index === fieldIndex
                  ? { ...field, completed: !field.completed }
                  : field
              ),
            }
          : task
      )
    );
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * tasksPerPage < tasks.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const visibleTasks = tasks.slice(
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {visibleTasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-100 shadow-md rounded-md p-6 flex flex-col items-start"
            >
              <p className="text-lg font-semibold mb-4">{task.title}</p>
              {task.fields && task.fields.length > 0 ? (
                task.fields.map((field, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={field.completed}
                      onChange={() => toggleFieldCompletion(task.id, index)}
                      className="mr-3 w-5 h-5 rounded-full border-2 border-red-500 text-red-500 focus:ring-red-500"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}:
                      </label>
                      <p className="text-sm">{field.value}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No subtasks available</p>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${
              currentPage === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Show Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * tasksPerPage >= tasks.length}
            className={`px-4 py-2 rounded ${
              (currentPage + 1) * tasksPerPage >= tasks.length
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