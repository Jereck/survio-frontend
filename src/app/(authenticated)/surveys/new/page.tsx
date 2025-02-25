"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function SurveyForm() {
  const { token } = useAuthStore();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateSurvey = async () => {
    setError("");

    const res = await fetch("http://localhost:5000/surveys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const survey = await res.json();
      router.push(`/surveys/${survey.id}/edit`);
    } else {
      setError("Failed to create survey");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Survey</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Survey Title"
        className="w-full border p-2 rounded mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Survey Description"
        className="w-full border p-2 rounded mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        onClick={handleCreateSurvey}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Survey
      </button>
    </div>
  );
}
