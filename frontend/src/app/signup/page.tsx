"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function Page() {
  const router = useRouter(); // Initialize the router
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "", // Initialize with an empty string
    availability: "",
    budget: "",
    age: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Signup Page Mounted");
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user modifies input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address (e.g., example@domain.com).");
      return;
    }

    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.age ||
      !formData.location ||
      !formData.availability ||
      !formData.budget
    ) {
      setError("Please fill out all fields.");
      return;
    }

    // Clear error and proceed
    setError("");
    console.log("Form Data Submitted:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name, 
          pastHobbies: [], 
          activeHobbies: [],
          location: formData.location,
          availability: formData.availability,
          age: formData.age,
          budget: formData.budget
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("User created:", data);
        // Navigate to the next page
        router.push("/hobbies");
      } else {
        setError(data.message || "Failed to create user.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">Create New Profile</h1>
        <form onSubmit={handleSubmit} className="">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Subheading for Personal Information */}
          <div>
            <h2 className="text-md font-[family-name:var(--font-geist-mono)] font-semibold mt-6">Personal Information</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Location:</label>
              <select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full font-[family-name:var(--font-geist-mono)] border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select Location</option>
                <option value="rural">Rural</option>
                <option value="suburban">Suburban</option>
                <option value="urban">Urban</option>
              </select>
            </div>
          </div>

          <div>
            {/* Subheading for Hobby Information */}
            <h2 className="text-md font-[family-name:var(--font-geist-mono)] font-semibold mt-6">Hobby Information</h2>
            <div className="mb-4">
              <label htmlFor="availability" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Availability (hours per week):</label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                required
                className="w-full font-[family-name:var(--font-geist-mono)] border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Select availability</option>
                <option value="0-3">0-3</option>
                <option value="3-6">3-6</option>
                <option value="6+">6+</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="budget" className="block font-[family-name:var(--font-geist-mono)] text-sm font-medium mb-1">Budget (USD per month):</label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full border font-[family-name:var(--font-geist-mono)] border-gray-300 rounded px-3 py-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 font-[family-name:var(--font-geist-mono)] rounded transition"
            style={{ backgroundColor: "#db4d3a" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}