"use client";

import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

interface Team {
  id: string;
  name: string;
}

export default function TeamManagement({ teams, refreshTeams }: { teams: Team[]; refreshTeams: () => void }) {
  const { token } = useAuthStore();
  const [teamName, setTeamName] = useState("");

  const handleCreateTeam = async () => {
    if (!teamName) return;
    const res = await fetch("http://localhost:5000/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: teamName }),
    });

    if (res.ok) {
      setTeamName("");
      refreshTeams();
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded text-black">
      <h2 className="text-xl font-bold mb-3">Manage Teams</h2>
      <div className="mb-4">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="border p-2 w-full"
          placeholder="Enter team name"
        />
        <button onClick={handleCreateTeam} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
          Create Team
        </button>
      </div>

      <h3 className="text-lg font-semibold">Your Teams</h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id} className="mt-2 p-2 border rounded">
            <a href={`/dashboard/teams/${team.id}`} className="text-blue-500">
              {team.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
