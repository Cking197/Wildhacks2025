"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Hobbies() {
  const router = useRouter();
  const [rows, setRows] = useState<
    { activity: string; experience: string; editable: boolean }[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userID = new URL(window.location.href).searchParams.get("userID");

        const response = await fetch("http://127.0.0.1:5000/getUser", {
          method: "POST", // or GET with query params if supported
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: { $oid: userID },
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Example: backend returns hobbies like [{ activity: "Tennis", experience: "Intermediate" }, ...]
          const hobbyData = data.pastHobbies.map((hobby: any) => ({
            activity: hobby.activity,
            experience: hobby.experience,
            editable: false, // or true if you want them to be editable initially
          }));
          setRows(hobbyData);
        } else {
          setError(data.message || "Failed to load hobbies.");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    index: number,
    field: "activity" | "experience",
    value: string
  ) => {
    const updatedRows = [...rows];
    if (field === "activity") {
      updatedRows[index].activity = value;
    } else if (field === "experience") {
      updatedRows[index].experience = value;
    }
    setRows(updatedRows);
  };

  const addRow = () => {
    // Set all existing rows to non-editable
    const updatedRows = rows.map((row) => ({ ...row, editable: false }));
    setRows([...updatedRows, { activity: "", experience: "Beginner", editable: true }]);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hobbies Data Submitted:", rows);
  };

  const isButtonDisabled = rows.every((row) => row.activity.trim() === "");

  const handleFindNewHobbies = () => {
    if (!isButtonDisabled) {
      // Lock all rows by setting editable to false
      const updatedRows = rows.map((row) => ({ ...row, editable: false }));
      setRows(updatedRows);

      // Navigate to the hobbies_new page
      router.push("/hobbies_new");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">
          Past and Current Hobbies
        </h1>

        {/* Buttons Section */}
        <div className="flex justify-center gap-4 items-center flex-wrap mb-6">
          <button
            className="rounded-full border border-black px-4 py-2 text-black bg-gray-300 cursor-not-allowed"
            disabled
          >
            Hobbies
          </button>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="http://localhost:3000/tasks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tasks
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="http://localhost:3000/hobbies_new"
            target="_blank"
            rel="noopener noreferrer"
          >
            New Hobbies
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href="http://localhost:3000/profile"
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
          </a>
        </div>

        {/* Subheading */}
        <p className="text-center text-lg font-[family-name:var(--font-geist-mono)] font-medium mb-6">
          Add all current and previous hobbies you have had below
        </p>

        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Activity
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Experience
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    <input
                      type="text"
                      value={row.activity}
                      onChange={(e) =>
                        handleChange(index, "activity", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      placeholder="Enter activity"
                      disabled={!row.editable} // Disable input if not editable
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={row.experience}
                      onChange={(e) =>
                        handleChange(index, "experience", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      disabled={!row.editable} // Disable select if not editable
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addRow}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add Row
            </button>
            <button
              type="button"
              onClick={handleFindNewHobbies}
              disabled={isButtonDisabled}
              className={`text-white px-4 py-2 rounded transition ${isButtonDisabled
                  ? "bg-gray-300 cursor-not-allowed"
                  : "hover:opacity-90"
                }`}
              style={{
                backgroundColor: isButtonDisabled ? "#ccc" : "#db4d3a",
              }}
            >
              Find New Hobbies!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}