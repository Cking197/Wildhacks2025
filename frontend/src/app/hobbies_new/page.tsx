"use client";

import Image from "next/image";

export default function Page() {
  
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
          
          <p>
          Add hobbies you would like to start to Tasks. Refresh all to see three new hobbies.
          </p>

          {/* Three White Box Containers */}
          <div className="flex flex-row gap-6">
            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Activity 1</h3>
              <p>Time: {}</p>
              <p>Description:</p>
              {/* Text box for description from Gemini API */}
              {/* <textarea
                value={dataFromBackend} // Replace with the actual state holding backend data
                readOnly
                className="w-full border border-gray-300 rounded p-4 text-sm resize-none overflow-auto mt-2"
                style={{ height: "auto" }}
                rows={Math.max(3, dataFromBackend.split("\n").length)} // Dynamically adjust rows based on content
              /> */}
              <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add
            </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 2</h3>
              <p>Time: {}</p>
              <p>Description:</p>
              {/* Text box for description from Gemini API */}
              {/* <textarea
                value={dataFromBackend} // Replace with the actual state holding backend data
                readOnly
                className="w-full border border-gray-300 rounded p-4 text-sm resize-none overflow-auto mt-2"
                style={{ height: "auto" }}
                rows={Math.max(3, dataFromBackend.split("\n").length)} // Dynamically adjust rows based on content
              /> */}
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add
            </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 3</h3>
              <p>Time: {}</p>
              <p>Description:</p>
              {/* Text box for description from Gemini API */}
              {/* <textarea
                value={dataFromBackend} // Replace with the actual state holding backend data
                readOnly
                className="w-full border border-gray-300 rounded p-4 text-sm resize-none overflow-auto mt-2"
                style={{ height: "auto" }}
                rows={Math.max(3, dataFromBackend.split("\n").length)} // Dynamically adjust rows based on content
              /> */}
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto mt-4"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Add
            </a>
            </div>
          </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
                    <a
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                      href="/signup"
                      style={{ backgroundColor: "#db4d3a" }}
                    >
                      See tasks
                    </a>
                    <a
                      className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
                      href="/signup"
                    >
                      Refresh all
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