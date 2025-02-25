"use client";

import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

interface Survey {
  id: string;
  title: string;
}

export default function SurveyManagement({ surveys, refreshSurveys }: { surveys: Survey[]; refreshSurveys: () => void }) {
  const { token } = useAuthStore();
  const [surveyTitle, setSurveyTitle] = useState("");

  const handleCreateSurvey = async () => {
    if (!surveyTitle) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const res = await fetch(`${API_URL}/surveys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: surveyTitle }),
    });

    if (res.ok) {
      setSurveyTitle("");
      refreshSurveys();
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded text-black">
      <h2 className="text-xl font-bold mb-3">Manage Surveys</h2>
      <div className="mb-4">
        <input
          type="text"
          value={surveyTitle}
          onChange={(e) => setSurveyTitle(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter survey title"
        />
        <button onClick={handleCreateSurvey} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          Create Survey
        </button>
      </div>

      <h3 className="text-lg font-semibold">Your Surveys</h3>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id} className="mt-2 p-2 border rounded">
            {survey.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
