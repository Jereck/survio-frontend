"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

// Add this interface near the top
interface Survey {
  id: string;
  title: string;
}

export default function SurveyDashboard() {
  const { token } = useAuthStore();
  const router = useRouter();
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchSurveys = async () => {
      const res = await fetch("http://localhost:5000/surveys", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSurveys(await res.json());
      }
    };

    fetchSurveys();
  }, [token, router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Surveys</h1>
      <button
        onClick={() => router.push("/surveys/new")}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Create New Survey
      </button>
      <div className="grid gap-4">
        {surveys.length > 0 ? (
          surveys.map((survey) => (
            <div
              key={survey.id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <span>{survey.title}</span>
              <button
                onClick={() => router.push(`/surveys/${survey.id}`)}
                className="text-blue-500"
              >
                View
              </button>
            </div>
          ))
        ) : (
          <p>No surveys created yet.</p>
        )}
      </div>
    </div>
  );
}
