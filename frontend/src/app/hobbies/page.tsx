"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Hobbies() {
  const router = useRouter();
  const [rows, setRows] = useState<
    { activity: string; experience: string; editable: boolean }[]
  >([]);
  const [error, setError] = useState("");
  const [userID, setUserID] = useState<string | null>(null); // State to store the userID

  useEffect(() => {
    const fetchData = async () => {
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

        const data = await response.json();
        console.log(data)

        if (response.ok) {
          const hobbyData = data.pastHobbies.map((hobby: any) => ({
            activity: hobby.activity,
            experience: hobby.experience,
            editable: false,
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

  const updateRows = (newRows: { activity: string; experience: string; editable: boolean }[]) => {
    setRows(newRows);
    console.log('hi')

    const rows = newRows.slice()
    if(rows.length == 0){
      return
    }
    while(rows.length != 0 && rows[rows.length - 1].activity === ''){
      rows.pop()
    }
    console.log("Rows updated:", rows);

    const fetchData = async () => {
      try {
        const userID = new URL(window.location.href).searchParams.get("userID");

        const response = await fetch("http://127.0.0.1:5000/getUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: { $oid: userID },
          }),
        });

        const data = await response.json();
        console.log(data)

        if (!response.ok) {
          setError(data.message || "Failed to load hobbies.");
        } else {
          const response = await fetch("http://127.0.0.1:5000/updateUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              _id: { $oid: userID },
              name: data.name,
              pastHobbies: rows,
              activeHobbies: data.activeHobbies,
              location: data.location,
              availability: data.availability,
              budget: data.budget,
              age: data.age
            }),
          });
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching data.");
      }
    };
    fetchData();
  };

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
    const updatedRows = rows.map((row) => ({ ...row, editable: false }));
    updateRows([...updatedRows, { activity: "", experience: "Beginner", editable: true }]);
  };

  const removeRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    updateRows(updatedRows);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hobbies Data Submitted:", rows);
  };

  const isButtonDisabled = rows.every((row) => row.activity.trim() === "");

  const handleFindNewHobbies = () => {
    if (!isButtonDisabled) {
      const updatedRows = rows.map((row) => ({ ...row, editable: false }));
      updateRows(updatedRows);

      // Navigate to the hobbies_new page with userID
      router.push(`/hobbies_new?userID=${userID}`);
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
            href={`/tasks?userID=${userID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tasks
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/hobbies_new?userID=${userID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            New Hobbies
          </a>

          <a
            className="rounded-full border border-black px-4 py-2 text-black hover:bg-black hover:text-white transition"
            href={`/profile?userID=${userID}`}
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
                      disabled={!row.editable}
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={row.experience}
                      onChange={(e) =>
                        handleChange(index, "experience", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded px-2 py-1"
                      disabled={!row.editable}
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
              className={`text-white px-4 py-2 rounded transition ${
                isButtonDisabled
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