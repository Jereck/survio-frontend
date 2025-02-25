"use client";

import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// Add this interface near the top
interface Survey {
  id: string;
  title: string;
  description: string;
}

export default function SurveyPage() {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const res = await fetch(`http://localhost:5000/surveys/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch survey");
        const data = await res.json();
        setSurvey(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSurvey();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (!survey) return <div>Survey not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{survey.title}</h1>
      <p className="text-gray-700">{survey.description}</p>
      <a href={`/surveys/${survey.id}/edit`} className="mt-4">
        Edit Survey
      </a>
    </div>
  );
}
