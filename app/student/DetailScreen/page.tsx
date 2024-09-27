"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

// Define a type for the form data
interface FormData {
  [key: string]: string | number | boolean | null; // Adjust the value types as needed
}

const DetailScreen = () => {
  const [formDataArray, setFormDataArray] = useState<FormData[]>([]); // Specify the type of the state
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const savedData = localStorage.getItem("studentFormData");
    if (savedData) {
      setFormDataArray(JSON.parse(savedData));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Student Details
        </h1>
        <div className="flex flex-wrap space-x-4 space-y-4 items-center justify-center">
          {formDataArray.length > 0 ? (
            formDataArray.map((formData, index) => (
              <div
                key={index}
                className="flex-1 min-w-[200px] p-4 border rounded-md bg-gray-50 shadow-md"
              >
                {Object.entries(formData).map(([key, value]) => (
                  <h2
                    key={key}
                    className="text-lg font-medium text-gray-700 capitalize"
                  >
                    {key}:{" "}
                    {value !== undefined && value !== null
                      ? value.toString()
                      : "N/A"}
                  </h2>
                ))}
              </div>
            ))
          ) : (
            <h2 className="text-lg font-medium text-gray-700">
              No student data available
            </h2>
          )}
        </div>
        <button
          onClick={() => router.back()} // Navigate back to EntryScreen
          className="mt-6 w-auto self-center bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Back to Entry Form
        </button>
      </div>
    </div>
  );
};

export default DetailScreen;
