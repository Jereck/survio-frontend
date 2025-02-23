"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

interface User {
  id: string;
  email: string;
  role: string;
}

interface Team {
  id: string;
  name: string;
}

export default function TeamAssignment() {
  const { token, user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  
  useEffect(() => {
    
    const fetchUsersAndTeams = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      try {
        const resUsers = await fetch(`${API_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataUsers = await resUsers.json();

        const resTeams = await fetch(`${API_URL}/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const dataTeams = await resTeams.json();

        setUsers(dataUsers.filter((u: User) => u.id !== user?.userId)); // Exclude self
        setTeams(dataTeams);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchUsersAndTeams();
  }, [token, user]);

  const handleAssign = async () => {
    if (!selectedUser || !selectedTeam) return;
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${API_URL}/teams/assign-team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: selectedUser, teamId: selectedTeam }),
    });

    if (res.ok) {
      setMessage("User assigned to team successfully!");
      setSelectedUser(null);
      setSelectedTeam(null);
    } else {
      const data = await res.json();
      setMessage(data.message || "Failed to assign user to team.");
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold">Assign Users to Teams</h3>
      {message && <p className="text-green-600">{message}</p>}
      <div className="flex gap-4 mt-4">
        <select
          value={selectedUser || ""}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="border p-2"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email} ({user.role})
            </option>
          ))}
        </select>

        <select
          value={selectedTeam || ""}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAssign}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign
        </button>
      </div>
    </div>
  );
}
