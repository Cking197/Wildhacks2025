import Image from "next/image";

export default function Page() {
  
  return (
    <div className="flex items-center justify-center min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* White Box Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 sm:p-12 w-full h-[90vh] max-w-5xl">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
  
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/hobbies"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hobbies
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tasks
            </a>

            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-grey/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent hover:text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
              href="http://localhost:3000/hobbies_new"
              target="_blank"
              rel="noopener noreferrer"
            >
              New Hobbies
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/profile"
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
              <h3 className="text-lg font-semibold">Hobby 1</h3>
              <p>Details about Hobby 1.</p>
              <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/hobby1_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-xs sm:text-sm h-10 sm:h-12 px-3 sm:px-4 sm:w-auto"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a different hobby
            </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 2</h3>
              <p>Details about Hobby 2.</p>
              <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/hobby2_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get started
            </a>

            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-xs sm:text-sm h-10 sm:h-12 px-3 sm:px-4 sm:w-auto"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a different hobby
            </a>
            </div>


            <div className="bg-gray-100 shadow-md rounded-md p-6 flex-1">
              <h3 className="text-lg font-semibold">Hobby 3</h3>
              <p>Details about Hobby 3.</p>
              <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tasks
            </a>
            
            <a
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-xs sm:text-sm h-10 sm:h-12 px-3 sm:px-4 sm:w-auto"
              href="http://localhost:3000/hobby3_tasks"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a different hobby
            </a>
            
            </div>
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