"use client";

import React, { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "rural",
    availability: "",
    budget: "",
    age: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Clear error when user modifies input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address (e.g., example@domain.com).");
      return;
    }

    console.log("Form Data Submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-[family-name:var(--font-geist-mono)] font-bold mb-6 text-center">Create New Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Subheading for Personal Information */}
          <h2 className="text-md font-[family-name:var(--font-geist-mono)] font-semibold mb-6">Personal Information</h2>

          <div>
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
          <div>
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
          <div>
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
          <div>
            <label htmlFor="location" className="block text-sm font-[family-name:var(--font-geist-mono)] font-medium mb-1">Location:</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full font-[family-name:var(--font-geist-mono)] border border-gray-300 rounded px-3 py-2"
            >
              <option value="rural">Rural</option>
              <option value="suburban">Suburban</option>
              <option value="urban">Urban</option>
            </select>
          </div>
          <div>
          {/* Subheading for Hobby Information */}
          <h2 className="text-md font-[family-name:var(--font-geist-mono)] font-semibold mb-6">Hobby Information</h2>


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
          <div>
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