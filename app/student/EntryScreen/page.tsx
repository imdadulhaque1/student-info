// pages/student/entryScreen.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import from next/navigation

const EntryScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    email: "",
    section: "",
    department: "",
  });

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { name, id, email, section, department } = formData;

    if (!name || !id || !email || !section || !department) {
      console.error("All fields are required and must be non-empty strings.");
      return;
    }

    try {
      // Retrieve existing data or initialize a new array
      const savedData = localStorage.getItem("studentFormData");
      let existingData = savedData ? JSON.parse(savedData) : []; // Ensure it's an array

      // Check if existingData is an array
      if (!Array.isArray(existingData)) {
        console.error(
          "Existing data is not an array, resetting to an empty array."
        );
        existingData = []; // Reset to empty array if it's not
      }

      // Add the new entry to the array
      existingData.push(formData);

      // Save the updated array back to localStorage
      localStorage.setItem("studentFormData", JSON.stringify(existingData));

      // Log the data saved in localStorage
      console.log("Data saved to localStorage:", existingData);

      // Navigate to DetailScreen
      router.push("/student/DetailScreen");
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Student Entry Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "id", "email", "section", "department"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EntryScreen;
