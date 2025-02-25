"use client";

import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SurveyEditPage() {
  const { id } = useParams();
  const { token } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSurvey();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/surveys/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error("Failed to update survey");
      setMessage("Survey updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update survey");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Edit Survey</h1>
      {message && <p className="text-green-600">{message}</p>}
      <input
        type="text"
        className="border p-2 w-full mt-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mt-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleUpdate}
      >
        Save Changes
      </button>
    </div>
  );
}