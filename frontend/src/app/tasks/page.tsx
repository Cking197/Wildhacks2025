'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  // State to store tasks
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks"); // Replace with your API endpoint
        if (response.ok) {
          const result = await response.json();
          setTasks(result); // Set the fetched tasks to the state
        } else {
          console.error("Failed to fetch tasks");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, []);

  // Toggle the completion status of a task
  const toggleTask = async (id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !task.completed }),
        });
        if (response.ok) {
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === id ? { ...task, completed: !task.completed } : task
            )
          );
        } else {
          console.error("Failed to toggle task completion");
        }
      } catch (error) {
        console.error("Error toggling task completion:", error);
      }
    }
  };

  // Delete a task from the list
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Add a new task to the list
  const addTask = async () => {
    const taskText = prompt("Enter the task text:");
    const taskDeadline = prompt("Enter the task deadline (YYYY-MM-DD):");
    if (taskText && taskDeadline) {
      const newTask = {
        text: taskText,
        deadline: new Date(taskDeadline).toISOString(),
        completed: false,
        checklist: [],
      };
      try {
        const response = await fetch("http://localhost:5000/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
        if (response.ok) {
          const result = await response.json();
          setTasks((prevTasks) => [...prevTasks, { ...newTask, id: result.id }]);
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Remove a white box and its contents
  const removeWhiteBox = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* White Box Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12 w-full min-h-full max-w-5xl">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          {/* Navigation Links */}
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3"
              href="http://localhost:3000/hobbies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hobbies
            </a>

            <a
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3 opacity-50 hover:opacity-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tasks
            </a>

            <a
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3"
              href="http://localhost:3000/hobbies_new"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Hobbies
            </a>

            <a
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3"
              href="http://localhost:3000/signup"
              target="_blank"
              rel="noopener noreferrer"
            >
              Profile
            </a>
          </div>

          {/* Introductory Text */}
          <p>Here are some tasks to get started with your hobbies.</p>

          {/* Render the white boxes */}
          <div className="flex flex-row gap-6">
            {tasks.map((task, index) => (
              <div key={task.id} className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
                <h3 className="text-lg font-semibold">{`Activity ${index + 1}`}</h3>
                {/* Render the checklist */}
                <div className="checklist flex flex-col gap-4 mt-4">
                  {task.checklist?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex flex-col bg-gray-50 shadow-sm rounded-md p-4">
                      <label
                        className={`flex items-center gap-2 ${
                          item.completed ? "text-gray-400 line-through" : "text-black"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => {
                            const updatedChecklist = task.checklist.map((checkItem, i) =>
                              i === itemIndex ? { ...checkItem, completed: !checkItem.completed } : checkItem
                            );
                            setTasks((prevTasks) =>
                              prevTasks.map((t) =>
                                t.id === task.id ? { ...t, checklist: updatedChecklist } : t
                              )
                            );
                          }}
                          className="w-4 h-4"
                        />
                        {item.text}
                      </label>
                    </div>
                  ))}
                </div>
                {/* Remove Button */}
                <div className="mt-6">
                  <button
                    className="rounded-lg bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                    onClick={() => removeWhiteBox(task.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Find New Hobby Button */}
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/hobbies_new"
            >
              Find New Hobby
            </a>
          </div>
        </main>

        {/* Footer */}
        <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-8">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="http://localhost:3000/about_us"
            target="_blank"
            rel="noopener noreferrer"
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