'use client'

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Sample Task 1", completed: false, deadline: new Date() },
    { id: 2, text: "Sample Task 2", completed: true, deadline: new Date() },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* White Box Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12 w-full min-h-full max-w-5xl">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
  
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
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tasks
            </a>

            <a
              className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base px-6 py-3 opacity-50 hover:opacity-100"
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
          
          <p>Here are some hobbies you could try. 
            Click on a hobby to learn about how to get started.  
            </p>

          {/* Three White Box Containers */}
          <div className="flex flex-row gap-6">
            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Activity 1</h3>

              <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-gray-100 shadow-md rounded-md p-4"
                  >
                    <label
                      className={`flex items-center gap-2 ${
                        task.completed ? "text-gray-400 line-through" : "text-black"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4"
                      />
                      {task.text}
                    </label>
                    <p className="text-sm text-gray-500">
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to remove from tasks
            </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 2</h3>



            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to remove from tasks
              </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 3</h3>

              <div className="flex flex-col gap-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between bg-gray-100 shadow-md rounded-md p-4"
                  >
                    <label
                      className={`flex items-center gap-2 ${
                        task.completed ? "text-gray-400 line-through" : "text-black"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4"
                      />
                      {task.text}
                    </label>
                    <p className="text-sm text-gray-500">
                      Deadline: {new Date(task.deadline).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click to remove from tasks
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                      href="/signup"
                    >
                      Get started
                    </a>
                  </div>

        </main>
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