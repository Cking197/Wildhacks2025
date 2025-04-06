"use client";

import React, { useState, useEffect } from "react";

export default function Hobbies() {
  const [rows, setRows] = useState<
    { activity: string; experience: string; active: boolean }[]
  >([
    { activity: "", experience: "Beginner", active: false },
  ]);

  useEffect(() => {
    console.log("Hobbies Page Mounted");
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleChange = (
    index: number,
    field: "activity" | "experience" | "active",
    value: string | boolean
  ) => {
    const updatedRows = [...rows];
    if (field === "activity" && typeof value === "string") {
      updatedRows[index].activity = value;
    } else if (field === "experience" && typeof value === "string") {
      updatedRows[index].experience = value;
    } else if (field === "active" && typeof value === "boolean") {
      updatedRows[index].active = value;
    }
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([...rows, { activity: "", experience: "Beginner", active: false }]);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hobbies Data Submitted:", rows);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">
          Hobbies
        </h1>
        <form onSubmit={handleSubmit}>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Activity</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Active</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
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
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={row.experience}
                      onChange={(e) =>
                        handleChange(index, "experience", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={row.active}
                      onChange={(e) =>
                        handleChange(index, "active", e.target.checked)
                      }
                    />
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
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}