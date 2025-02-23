"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import TeamMembers from "../../team-members";

interface Team {
  id: string;
  name: string;
}

export default function TeamPage() {
  const { id } = useParams(); // Get team ID from URL
  const { token } = useAuthStore();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchTeam = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/teams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTeam(data);
      }
      setLoading(false);
    };

    fetchTeam();
  }, [id, token]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!team) {
    return <div className="h-screen flex items-center justify-center">Team not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold">{team.name}</h1>

      <div className="mt-4">
        <TeamMembers teamId={team.id} />
      </div>
    </div>
  );
}
